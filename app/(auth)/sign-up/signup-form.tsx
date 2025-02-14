'use client'

import Link from 'next/link'
import { redirect, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { IUserSignUp } from '@/lib/types'
import { toast } from '@/hooks/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { UserSignUpSchema } from '@/lib/validator'
import { isRedirectError } from 'next/dist/client/components/redirect-error'
import { registerUser, signInWithCredentials } from '@/lib/actions/user.actions'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

const signUpDefaultValues =
  process.env.NODE_ENV === 'development'
    ? {
        name: 'webstoryboy',
        email: 'webstoryboy@naver.com',
        password: '123456',
        confirmPassword: '123456',
      }
    : {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      }

export default function SignUpForm() {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/'

  const form = useForm<IUserSignUp>({
    resolver: zodResolver(UserSignUpSchema), // zod 스키마로 유효성 검사
    defaultValues: signUpDefaultValues, // 기본 값 설정
  })

  const { control, handleSubmit } = form // 폼 컨트롤 객체 및 제출 핸들러 가져오기

  const onSubmit = async (data: IUserSignUp) => {
    try {
      const res = await registerUser(data) // 회원가입 API 호출

      if (!res.success) {
        // 에러 메시지를 한글로 번역
        let errorMessage = res.error
        if (res.error === 'email already exists') {
          errorMessage = '이메일이 이미 존재합니다.' // 한글 메시지로 변경
        }

        // 토스트로 에러 메시지 표시
        toast({
          title: '에러',
          description: String(errorMessage),
          variant: 'destructive',
        })
        return
      }

      // 회원가입 성공 시 성공 메시지 추가
      toast({
        title: '회원가입 성공!',
        description: '🎉 환영합니다! 이메일 인증해주세요! ',
        variant: 'default',
      })

      // 회원가입 성공 시 자동 로그인
      await signInWithCredentials({
        email: data.email,
        password: data.password,
      })

      redirect(callbackUrl)
    } catch (error) {
      if (isRedirectError(error)) {
        throw error
      }
      toast({
        title: '에러',
        description: '이메일 또는 비밀번호가 정확하지 않습니다.',
        variant: 'destructive',
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type='hidden' name='callbackUrl' value={callbackUrl} />
        <div className='space-y-6'>
          <FormField
            control={control}
            name='name'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel className='text-black800 font-poppins'>
                  Name
                </FormLabel>
                <FormControl>
                  <Input
                    className='border-black300'
                    placeholder='이름을 입력해주세요!'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name='email'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel className='text-black800 font-poppins'>
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    className='border-black300'
                    placeholder='이메일을 입력해주세요!'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name='password'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel className='text-black800 font-poppins'>
                  Password
                </FormLabel>
                <FormControl>
                  <Input
                    type='password'
                    className='border-black300'
                    placeholder='비밀번호를 입력하세요!'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name='confirmPassword'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel className='text-black800 font-poppins'>
                  Confirm Password
                </FormLabel>
                <FormControl>
                  <Input
                    type='password'
                    className='border-black300'
                    placeholder='확인 비밀번호를 입력하세요!'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='text-center w-full'>
            <Button
              type='submit'
              className='w-full py-6 bg-black100 text-white'
            >
              Sign Up
            </Button>
          </div>
          <div className='text-sm font-nanum leading-6 text-center'>
            계정을 만들면{' '}
            <Link href='/page/conditions-of-use' className='uline'>
              이용약관
            </Link>
            과{' '}
            <Link href='/page/privacy-policy' className='uline'>
              개인정보 처리방침
            </Link>
            에 뿅~ 동의하신 걸로 알겠습니다.! 😊 함께 멋진 여정을 시작해볼까요?
            🚀 <br />
            <p className='mt-1'>
              이미 계정이 있다고요?!🥳 그럼{' '}
              <Link
                className='uline'
                href={`/sign-in?callbackUrl=${callbackUrl}`}
              >
                로그인
              </Link>
              해주세요!
            </p>
          </div>
        </div>
      </form>
    </Form>
  )
}
