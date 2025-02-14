import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/db'
import User from '@/lib/db/models/user.model'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const token = searchParams.get('token')

  if (!token) {
    return NextResponse.json(
      { success: false, message: '잘못된 요청입니다.' },
      { status: 400 }
    )
  }

  await connectToDatabase()

  // 토큰 검증 및 이메일 인증 처리
  const user = await User.findOne({ verificationToken: token })

  if (!user) {
    return NextResponse.json(
      { success: false, message: '유효하지 않은 인증 토큰입니다.' },
      { status: 400 }
    )
  }

  // 이메일 인증 완료 처리
  user.emailVerified = true
  user.verificationToken = undefined // 인증 후 토큰 삭제
  await user.save()

  return NextResponse.json({
    success: true,
    message: '이메일 인증이 완료되었습니다.',
  })
}
