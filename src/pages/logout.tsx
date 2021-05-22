// Libs
import { ReactElement, useEffect } from 'react'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'
// custom Functions
import { withAuth } from '../lib'
// Hooks
import { useAuth } from '../providers/Auth'

const Logout = (): ReactElement => {
  const { t } = useTranslation()
  const { setAuthenticated } = useAuth()
  const router = useRouter()
  useEffect(() => {
    async function doLogout (): Promise<void> {
      const response = await fetch('/api/logout')
      if (response.status === 200) {
        setAuthenticated(false)
        router.push('/')
      } else {
        console.error('Failed to logout', response)
      }
    }
    doLogout()
  }, [setAuthenticated])

  return <p>{t('logout:msg')}</p>
}

export const getServerSideProps: GetServerSideProps = withAuth

export default Logout
