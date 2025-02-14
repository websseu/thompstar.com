import Image from 'next/image'
import Link from 'next/link'
import { auth } from '@/auth'
import { Button, buttonVariants } from '@/components/ui/button'
import { SignOut } from '@/lib/actions/user.actions'
import { cn } from '@/lib/utils'
import { Gi3dGlasses } from 'react-icons/gi'
import { LuDot } from 'react-icons/lu'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export default async function RightButton() {
  const session = await auth()

  return (
    <div className='absolute right-4'>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          {session ? (
            // 로그인 상태일 때
            <div className='w-full circle py-2 px-2 pr-4 h-11'>
              <div>
                <Image
                  src={session.user.image || '/face/default.jpg'}
                  alt={session.user.name || 'Profile'}
                  width={30}
                  height={30}
                  className='rounded-full mr-2'
                />
              </div>
              <div className='flex flex-col text-xs text-left'>
                <span>Hello, {session.user.name}</span>
                <span className='font-semibold'>Welcome</span>
              </div>
            </div>
          ) : (
            // 비로그인 상태일 때
            <div className='circle'>
              <Gi3dGlasses size='20' className='dark:text-black100' />
            </div>
          )}
        </DropdownMenuTrigger>
        {session ? (
          <DropdownMenuContent
            className='w-56 mr-0 mt-2 bg-background border-black400 ring ring-black500 dark:ring-0'
            align='end'
            forceMount
          >
            <DropdownMenuLabel className='font-normal'>
              <div className='flex flex-col space-y-1 border-b border-black500 pb-3'>
                <p className='text-base my-1 leading-none'>
                  {session.user.name}
                </p>
                <p className='text-xs text-black300 leading-none'>
                  {session.user.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuGroup>
              <Link href='/account'>
                <DropdownMenuItem>
                  <LuDot />내 정보 관리하기
                </DropdownMenuItem>
              </Link>
              <Link href='/account/orders'>
                <DropdownMenuItem>
                  <LuDot />내 활동 기록 보기
                </DropdownMenuItem>
              </Link>
              {session.user.role === 'Admin' && (
                <Link href='/admin/overview'>
                  <DropdownMenuItem>
                    <LuDot />
                    관리자 페이지로 이동
                  </DropdownMenuItem>
                </Link>
              )}
            </DropdownMenuGroup>
            <DropdownMenuItem className='p-0 mb-1'>
              <form action={SignOut} className='w-full font-nanum'>
                <Button
                  className='w-full py-4 px-2 h-4 justify-start'
                  variant='ghost'
                >
                  <LuDot />
                  로그아웃
                </Button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        ) : (
          <DropdownMenuContent
            className='w-56 mr-1 bg-background'
            align='end'
            forceMount
          >
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Link
                  className={cn(
                    buttonVariants(),
                    'w-full font-nanum bg-black text-white'
                  )}
                  href='/sign-in'
                >
                  로그인
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuLabel>
              <div className='font-normal font-nanum text-center text-black300 mb-1'>
                반가워요! 😊 <br />
                아직 계정이 없으신가요? <br />
                <Link href='/sign-up' className='underline underline-offset-4'>
                  회원가입
                </Link>
                하고 시작하세요! 🚀
              </div>
            </DropdownMenuLabel>
          </DropdownMenuContent>
        )}
      </DropdownMenu>
    </div>
  )
}
