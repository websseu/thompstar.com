'use client'

import { GiMoebiusStar, GiOverkill } from 'react-icons/gi'
import { useTheme } from 'next-themes'

export default function ThemeButton() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <div className='absolute left-4 hidden sm:block'>
      <span className='circle' onClick={toggleTheme}>
        {theme === 'dark' ? (
          <GiOverkill size={20} />
        ) : (
          <GiMoebiusStar size={20} />
        )}
      </span>
    </div>
  )
}
