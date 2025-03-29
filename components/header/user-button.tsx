import Image from 'next/image'
import Link from 'next/link'
import { auth } from '@/auth'
import { SignOut } from '@/lib/actions/user.actions'
import { GiWolfHowl } from 'react-icons/gi'
import { Button } from '@/components/ui/button'
import { BadgeCheck, Bell, FolderLock, NotebookPen, Crown } from 'lucide-react'
import { getDayFormattedWeekday } from '@/lib/utils'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'

export default async function UserButton() {
  const session = await auth()

  return (
    <div className='absolute right-4'>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          {session ? (
            // 로그인 상태일 때
            <div className='border rounded-full p-1 bg-background ring ring-gray-300/20 hover:ring-gray-300/60 cursor-pointer'>
              <Image
                src={session.user.image || '/face/default.jpg'}
                alt={session.user.name || 'Profile'}
                width={34}
                height={34}
                className='rounded-full w-8 h-8 object-cover'
              />
            </div>
          ) : (
            // 비로그인 상태일 때
            <div className='circle'>
              <GiWolfHowl size='20' />
            </div>
          )}
        </DropdownMenuTrigger>
        {session ? (
          <DropdownMenuContent
            className='w-56 mr-0 mt-1 bg-background ring ring-gray-300/20 hover:ring-gray-300/60'
            align='end'
            forceMount
          >
            <DropdownMenuLabel className='font-normal'>
              <div className='flex items-center'>
                <div className='w-8 h-8 flex items-center justify-center text-[10px] bg-accent rounded-full mr-1.5 mt-1 font-popins font-bold text-zinc-500'>
                  {session.user.visitCount}
                </div>
                <div className='flex flex-col space-y-1'>
                  <p className='text-sm my-1 font-bold leading-none'>
                    {session.user.name}
                  </p>
                  <p className='text-[10px] leading-none text-black700'>
                    {session.user.email}
                  </p>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <BadgeCheck className='h-4 w-4 text-zinc-500' />
              계정관리
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Bell className='h-4 w-4 text-zinc-500' />
              알림
            </DropdownMenuItem>
            {session.user.role === 'Admin' && (
              <>
                <Link href='/admin/overview'>
                  <DropdownMenuItem>
                    <FolderLock className='h-4 w-4 text-zinc-500' />
                    관리자
                  </DropdownMenuItem>
                </Link>
                <Link href='/admin/posts/create'>
                  <DropdownMenuItem>
                    <NotebookPen className='h-4 w-4 text-zinc-500' />
                    글쓰기
                  </DropdownMenuItem>
                </Link>
              </>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem className='p-0 m-1 mt-2'>
              <form action={SignOut} className='w-full m-0 p-0'>
                <Button className='w-full cursor-pointer'>로그아웃</Button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        ) : (
          <DropdownMenuContent
            className='w-56 mr-0 mt-1 bg-background ring ring-gray-300/20 hover:ring-gray-300/60'
            align='end'
            forceMount
          >
            <DropdownMenuLabel className='font-normal'>
              <div className='flex items-center'>
                <div className='w-8 h-8 text-[10px] mr-1.5 font-bold leading-0 flex items-center justify-center bg-accent rounded-full font-popins text-zinc-700'>
                  hello
                </div>
                <div>
                  <p className='text-zinc-800 font-medium mt-0.5'>
                    {getDayFormattedWeekday(new Date())}
                  </p>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href='/sign-in' className='flex gap-2'>
                <Crown className='h-4 w-4 text-zinc-500' />
                회원가입
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className='p-0 m-1 mt-2'>
              <form action={SignOut} className='w-full m-0 p-0'>
                <Button className='w-full cursor-pointer'>로그인</Button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        )}
      </DropdownMenu>
    </div>
  )
}
