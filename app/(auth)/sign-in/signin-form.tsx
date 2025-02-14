'use client'

import { redirect, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { IUserSignIn } from '@/lib/types'
import { signInWithCredentials } from '@/lib/actions/user.actions'
import { toast } from '@/hooks/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { isRedirectError } from 'next/dist/client/components/redirect-error'
import { UserSignInSchema } from '@/lib/validator'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

const signInDefaultValues =
  process.env.NODE_ENV === 'development'
    ? {
        email: 'webstoryboy@naver.com',
        password: '123456',
      }
    : {
        email: '',
        password: '',
      }

export default function SignInForm() {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/'

  const form = useForm<IUserSignIn>({
    resolver: zodResolver(UserSignInSchema),
    defaultValues: signInDefaultValues,
  })

  const { control, handleSubmit } = form

  const onSubmit = async (data: IUserSignIn) => {
    try {
      await signInWithCredentials({
        email: data.email,
        password: data.password,
      })
      // 로그인 성공
      toast({
        title: '로그인 성공!',
        description: '🎉 환영합니다! 로그인이 완료되었습니다.',
        variant: 'default',
      })

      redirect(callbackUrl)
    } catch (error) {
      if (isRedirectError(error)) {
        throw error
      }
      // 로그인 실패
      toast({
        title: '로그인 실패! 😭🤬😢',
        description: '이메일 또는 비밀번호가 일치하지 않거나 계정이 없습니다.',
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
            name='email'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel className='text-black800 font-poppins'>
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    className='border-black100'
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
                    className='border-black100'
                    type='password'
                    placeholder='비밀번호를 입력하세요!'
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
              variant='default'
              className='w-full py-6 bg-black100 text-white hover:bg-black100 font-poppins'
            >
              Sign In
            </Button>
          </div>
        </div>
      </form>
    </Form>
  )
}
