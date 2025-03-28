import { APP_COPYRIGHT, APP_SLOGAN, APP_TITLE } from '@/lib/constants'

export default async function Footer() {
  return (
    <footer className='footer__container'>
      <div className='border-t font-nanum py-10'>
        <h6 className='text-xl font-light font-poppins mb-2'>{APP_TITLE}</h6>
        <p className='text-zinc-500 md:w-1/2 w-full leading-5 text-sm mb-2'>
          {APP_SLOGAN}
          <br />
          Thomp는 강한 비트와 리듬이 울리는 &quot;쿵쿵&quot; 소리를 의미하며,
          <br />
          이를 &quot;Star&quot;와 결합하여 음악이 빛나는 공간을 뜻합니다.
        </p>
        <p className='text-xs mt-1 text-zinc-500'>{APP_COPYRIGHT}</p>
      </div>
    </footer>
  )
}
