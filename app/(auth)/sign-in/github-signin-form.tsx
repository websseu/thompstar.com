'use client'

import { useFormStatus } from 'react-dom'
import { Button } from '@/components/ui/button'

import Image from 'next/image'
import { SignInWithGithub } from '@/lib/actions/user.actions'

export function GithubSignInForm() {
  const SignInButton = () => {
    const { pending } = useFormStatus()

    return (
      <Button
        disabled={pending}
        className='w-full font-poppins'
        variant='outline'
      >
        <Image
          src={'/logo/github.svg'}
          width={20}
          height={20}
          alt='깃헙 로고'
        />
        {pending ? 'Redirecting to github...' : 'Sign In with Github'}
      </Button>
    )
  }
  return (
    <form action={SignInWithGithub}>
      <SignInButton />
    </form>
  )
}
