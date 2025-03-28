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
            className='w-[45px] h-[45px] border-[11px] mx-0.5 p-0.5 sm:w-[52px] sm:h-[52px] sm:border-[13px] sm:mx-1 sm:p-1 md:w-[72px] md:h-[72px] md:border-[17px] md:mx-2 md:p-1 border-black dark:border-white rounded-full'
          />
        ) : (
          <MdStars className='text-orange-500 text-[53px] sm:text-[66px] md:text-[91px]' />
        )}
        <span className='ml-[-0.5vw] inline-block'>mp</span>
      </Link>
    </div>
  )
}
