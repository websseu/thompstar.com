'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MdStars } from 'react-icons/md'

export default function HeaderLogo() {
  const pathname = usePathname()
  const logoKeyword = [
    'melon',
    'bugs',
    'genie',
    'flo',
    'vibe',
    'apple',
    'youtube',
    'spotify',
  ]
  const matchedKey = logoKeyword.find((key) => pathname.includes(key))

  return (
    <div className='md:my-2 my-1 bg-background md:px-4 px-2'>
      <Link
        href={'/'}
        className='flex items-center md:text-8xl sm:text-7xl text-6xl font-poppins uppercase font-black'
      >
        <span className='mr-[-0.5vw] inline-block'>th</span>
        {matchedKey ? (
          <Image
            src={`/logo/${matchedKey}.png`}
            width={72}
            height={72}
            alt={`${matchedKey} logo`}
            className='border-[17px] border-black rounded-full mx-2 p-1'
          />
        ) : (
          <MdStars className='text-orange-500' />
        )}
        <span className='ml-[-0.5vw] inline-block'>mp</span>
      </Link>
    </div>
  )
}
