// Libs
import { ReactElement } from 'react'
import Link from 'next/link'
// Hooks
import useTranslation from 'next-translate/useTranslation'
import { useIsAuthenticated } from '../providers/Auth'

const Header = (): ReactElement => {
  const { t } = useTranslation()
  const isAuthenticated = useIsAuthenticated()
  return (
    <header>
      <Link href="/">
        <a>{t('header:home')}</a>
      </Link>{' '}
      |{' '}
      {isAuthenticated
        ? (
        <>
          <Link href="/profile">
            <a>{t('header:profile')}</a>
          </Link>{' '}
          |{' '}
          <Link href="/logout">
            <a>{t('header:logout')}</a>
          </Link>
        </>
          )
        : (
        <Link href="/login">
          <a>{t('header:login')}</a>
        </Link>
          )}
      <hr />
    </header>
  )
}

export default Header
