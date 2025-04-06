import { APP_COPYRIGHT, APP_SLOGAN, APP_TITLE } from '@/lib/constants'
import Link from 'next/link'

export default async function Footer() {
  return (
    <footer className='footer__container'>
      <div className='flex items-center gap-4 border-t pt-4'>
        <h6>국내 뮤직</h6>
        <ul className='flex gap-4 text-zinc-500 text-sm'>
          <li>
            <Link href='/korea/melon'>멜론</Link>
          </li>
          <li>
            <Link href='/korea/vibe'>바이브</Link>
          </li>
          <li>
            <Link href='/korea/genie'>지니</Link>
          </li>
          <li>
            <Link href='/korea/flo'>플로우</Link>
          </li>
          <li>
            <Link href='/korea/bugs'>벅스</Link>
          </li>
        </ul>
      </div>
      <div className='flex items-center gap-4 mt-1'>
        <h6>해외 뮤직</h6>
        <ul className='flex gap-4 text-zinc-500 text-sm'>
          <li>
            <Link href='/world/youtube'>유튜브 뮤직</Link>
          </li>
          <li>
            <Link href='/world/apple'>애플 뮤직</Link>
          </li>
        </ul>
      </div>

      <h6 className='w-full text-xl font-light font-poppins mb-2 mt-4 border-t pt-4'>
        {APP_TITLE}
      </h6>
      <div className='flex justify-between gap-6'>
        <div className='w-[380px]'>
          <p className='text-zinc-500 leading-5 text-sm mb-2'>
            {APP_SLOGAN}
            <br />
            Thomp는 강한 비트와 리듬이 울리는 &quot;쿵쿵&quot; 소리를 의미하며,
            이를 &quot;Star&quot;와 결합하여 음악이 빛나는 공간을 뜻합니다.
          </p>
          <p className='text-xs mt-1 text-zinc-500'>{APP_COPYRIGHT}</p>
        </div>
      </div>
    </footer>
  )
}
