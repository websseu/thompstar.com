'use client'

import { Button } from '@/components/ui/button'

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen '>
      <div className='p-6 text-center'>
        <h1 className='text-4xl font-nanum font-black mb-4'>😛 에러 발생 😅</h1>
        <p className='text-black400 px-10'>{error.message}</p>
        <Button
          variant='outline'
          className='mt-4 font-poppins'
          onClick={() => reset()}
        >
          Try again
        </Button>
        <Button
          variant='outline'
          className='mt-4 ml-2 font-poppins'
          onClick={() => (window.location.href = '/')}
        >
          Back To Home
        </Button>
      </div>
    </div>
  )
}
