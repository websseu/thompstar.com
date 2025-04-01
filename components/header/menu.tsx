'use client'

import React from 'react'
import Link from 'next/link'
import data from '@/lib/data'
import { MdStars } from 'react-icons/md'
import { MenuItem } from './menu-item'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'

export default function Menu() {
  return (
    <div className='nav'>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Started</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className='grid gap-3 p-1 sm:p-4 md:w-[300px] lg:w-[600px] lg:grid-cols-[.85fr_1fr]'>
                <li className='row-span-3'>
                  <NavigationMenuLink asChild>
                    <Link
                      className='flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md'
                      href='/'
                    >
                      <MdStars className='text-black h-6 w-6' />
                      <div className='mb-2 text-lg font-medium'>
                        thompstar.com
                      </div>
                      <p className='text-sm font-nanum leading-tight text-muted-foreground'>
                        전 세계 음악 차트를 한눈에!
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
                <MenuItem href='/' title='국내 음악'>
                  멜론, 지니, 벅스, 플로, 바이브 등 주요 국내 음원 차트를
                  실시간으로 확인하세요.
                </MenuItem>
                <MenuItem href='/' title='해외 음악'>
                  Apple Music, Spotify, YouTube Music의 글로벌 차트를 한곳에
                  모았습니다.
                </MenuItem>
                <MenuItem href='/' title='챠트'>
                  Billboard, Oricon, UK Official Chart 등 전 세계 유명 음악
                  차트를 한눈에 확인해보세요.
                </MenuItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger>Korea</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className='grid w-[300px] p-2 md:w-[500px] md:grid-cols-2 lg:w-[600px] '>
                {data.koreaMenu.map((korea) => (
                  <MenuItem
                    key={korea.title}
                    title={korea.title}
                    href={korea.href}
                  >
                    {korea.description}
                  </MenuItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger>World</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className='grid w-[300px] p-2 md:w-[500px] md:grid-cols-2 lg:w-[600px] '>
                {data.worldMenu.map((world) => (
                  <MenuItem
                    key={world.title}
                    title={world.title}
                    href={world.href}
                  >
                    {world.description}
                  </MenuItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}
