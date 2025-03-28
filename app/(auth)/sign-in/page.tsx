import Link from 'next/link'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import SignInForm from '@/components/auth/signin-form'

export const metadata: Metadata = {
  title: '로그인',
}

export default async function SignInPage(props: {
  searchParams: Promise<{
    callbackUrl: string
  }>
}) {
  const searchParams = await props.searchParams
  const { callbackUrl = '/' } = searchParams

  const session = await auth()
  if (session) {
    return redirect(callbackUrl)
  }

  return (
    <section className='max-w-[500px]'>
      <div className='border border-zinc-200 shadow-xs rounded-md p-10'>
        <h2 className='text-2xl text-center font-nexon mb-6'>로그인</h2>

        <SignInForm />

        {/* <p className='sperator line my-6'>
          <span>or</span>
        </p> */}

        <div className='text-sm text-zinc-500 leading-5 text-center mt-6'>
          로그인하시면 저희의{' '}
          <Link href='/page/conditions' className='uline'>
            이용약관
          </Link>
          과{' '}
          <Link href='/page/privacy' className='uline'>
            개인정보처리방침
          </Link>
          에 동의하신 것으로 간주됩니다. 소중한 정보를 안전하게 지킬 것을
          약속드려요. 💌
          <p className='mt-2'>
            아직 회원 가입 전이라면?{' '}
            <Link href='/sign-up' className='uline'>
              회원가입
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}
