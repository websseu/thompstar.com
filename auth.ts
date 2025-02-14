import { MongoDBAdapter } from '@auth/mongodb-adapter'
import { connectToDatabase } from './lib/db'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import client from './lib/db/client'
import User from './lib/db/models/user.model'
import NextAuth, { type DefaultSession } from 'next-auth'
import authConfig from './auth.config'
import Google from 'next-auth/providers/google'
import GitHub from 'next-auth/providers/github'

declare module 'next-auth' {
  interface Session {
    user: {
      role: string
      visitCount: number
      image: string
    } & DefaultSession['user']
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  pages: {
    signIn: '/sign-in',
    newUser: '/sign-up',
    error: '/sign-in',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
  adapter: MongoDBAdapter(client),
  providers: [
    Google,
    GitHub,

    CredentialsProvider({
      credentials: {
        email: { type: 'email' },
        password: { type: 'password' },
      },

      async authorize(credentials) {
        await connectToDatabase()

        if (credentials == null) return null

        // 로그인할 때마다 visitCount 1 증가
        const user = await User.findOneAndUpdate(
          { email: credentials.email },
          { $inc: { visitCount: 1 } }, // visitCount 값 증가
          { new: true, projection: 'name email role visitCount password image' } // 최신 값 반환
        )

        // 사용자가 존재하고 비밀번호가 저장되어 있는 경우
        if (user && user.password) {
          const isMatch = await bcrypt.compare(
            credentials.password as string,
            user.password
          )
          if (isMatch) {
            return {
              id: user._id,
              name: user.name,
              email: user.email,
              role: user.role,
              visitCount: user.visitCount,
              image: user.image,
            }
          }
        }
        return null // 인증 실패 시 null 반환
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user, trigger, session }) => {
      if (user) {
        if (!user.name) {
          await connectToDatabase()
          await User.findByIdAndUpdate(user.id, {
            name: user.name || user.email!.split('@')[0],
            role: 'user',
          })
        }
        token.name = user.name || user.email!.split('@')[0]
        token.role = (user as { role: string }).role
      }

      if (session?.user?.name && trigger === 'update') {
        token.name = session.user.name
      }
      return token
    },
    session: async ({ session, user, trigger, token }) => {
      session.user.id = token.sub as string
      session.user.role = token.role as string
      session.user.name = token.name

      if (trigger === 'update') {
        session.user.name = user.name
      }
      return session
    },
  },
})
