'use client'

import { useFormStatus } from 'react-dom'
import { Button } from '@/components/ui/button'
import { SignInWithGoogle } from '@/lib/actions/user.actions'
import Image from 'next/image'

export function GoogleSignInForm() {
  const SignInButton = () => {
    const { pending } = useFormStatus()

    return (
      <Button
        disabled={pending}
        className='w-full font-poppins'
        variant='outline'
      >
        <Image
          src={'/logo/google.svg'}
          width={20}
          height={20}
          alt='구글 로고'
        />
        {pending ? 'Redirecting to Google...' : 'Sign In with Google'}
      </Button>
    )
  }
  return (
    <form action={SignInWithGoogle}>
      <SignInButton />
    </form>
  )
}
