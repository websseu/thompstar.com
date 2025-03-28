import React from 'react'
import Link from 'next/link'
import { NavigationMenuLink } from '@/components/ui/navigation-menu'

interface MenuItemProps {
  title: string
  href: string
  children?: React.ReactNode
}

export function MenuItem({ title, href, children }: MenuItemProps) {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          className='block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-muted focus:bg-muted'
        >
          <div className='text-sm font-bold font-nanum leading-none'>
            {title}
          </div>
          <p className='line-clamp-2 text-sm font-nanum leading-snug text-muted-foreground'>
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}
