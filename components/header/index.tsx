import ThemeButton from './theme-button'
import UserButton from './user-button'
import Menu from './menu'
import HeaderLogo from './header-logo'

export default function Header() {
  return (
    <header className='header__container line'>
      <div className='flex items-center justify-center mx-4'>
        <ThemeButton />
        <HeaderLogo />
        <UserButton />
      </div>
      <Menu />
    </header>
  )
}
