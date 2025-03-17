'use server'

import { signIn, signOut } from '@/auth'
import { IUserSignIn, IUserSignUp } from '@/lib/types'
import { redirect } from 'next/navigation'
import { connectToDatabase } from '../db'
import { revalidatePath } from 'next/cache'
import { UserSignUpSchema } from '../validator'
import { sendVerificationEmail } from '../email'
import User from '../db/models/user.model'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import { formatError } from '../utils'

// 로그인(이메일/비밀번호)
export async function signInWithCredentials(user: IUserSignIn) {
  return await signIn('credentials', { ...user, redirect: false })
}

// 로그아웃
export const SignOut = async () => {
  await signOut({ redirect: false })
  redirect('/sign-in')
}

// 구글 로그인
export const SignInWithGoogle = async () => {
  await signIn('google')
}

// 깃헙 로그인
export const SignInWithGitHub = async () => {
  await signIn('github')
}

// 회원가입
export async function registerUser(userSignUp: IUserSignUp) {
  try {
    const user = await UserSignUpSchema.parseAsync({
      name: userSignUp.name,
      email: userSignUp.email,
      password: userSignUp.password,
      confirmPassword: userSignUp.confirmPassword,
      image: userSignUp.image,
    })

    // 데이타베이스 접속
    await connectToDatabase()

    // 이메일 중복 확인
    const existingUser = await User.findOne({ email: user.email })
    if (existingUser) {
      return { success: false, error: '이메일이 이미 존재합니다.' }
    }

    // 인증 토큰 생성
    const verificationToken = crypto.randomBytes(32).toString('hex')

    const num = Math.floor(Math.random() * 10) + 1
    const formattedNum = String(num).padStart(2, '0')
    const defaultImage = `/face/face${formattedNum}.jpg`

    const newUser = await User.create({
      ...user,
      password: await bcrypt.hash(user.password, 10),
      image: userSignUp.image || defaultImage,
      emailVerified: false,
      verificationToken,
    })

    // 인증 이메일 발송
    await sendVerificationEmail(newUser.email, verificationToken)

    return { success: true, message: '회원가입이 성공적으로 이루어졌습니다.' }
  } catch (error) {
    return { success: false, error: error }
  }
}

// 해당(id) 회원 삭제
export async function deleteUser(id: string) {
  try {
    await connectToDatabase()

    const res = await User.findByIdAndDelete(id)
    if (!res) throw new Error('사용자를 찾을 수 없습니다.')
    revalidatePath('/admin/users')

    return {
      success: true,
      message: '사용자를 삭제하였습니다.',
    }
  } catch (error) {
    return { success: false, message: formatError(error) }
  }
}

// 모든 회원 정보 가져오기(페이지네이션)
export async function getAllUsersPages({
  page = 1,
  limit = 10,
}: {
  page?: number
  limit?: number
}) {
  try {
    await connectToDatabase()

    const totalUsers = await User.countDocuments()
    const skipAmount = (Number(page) - 1) * limit
    const users = await User.find()
      .sort({ createdAt: -1 })
      .skip(skipAmount)
      .limit(limit)
      .lean()

    return {
      users,
      totalUsers,
      totalPages: Math.ceil(totalUsers / limit),
      currentPage: page,
    }
  } catch (error) {
    console.error('데이터 가져오기 오류:', error)
    throw new Error('데이터 가져오기 실패')
  }
}
