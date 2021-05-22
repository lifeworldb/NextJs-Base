// Libs
import { ReactElement, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { gql, useMutation } from '@apollo/client'
import { GetServerSideProps } from 'next'
// Custom Functions
import { withoutAuth } from '../lib'
// Components
import Layout from '../components/Layout'
// Hooks
import { useAuth } from '../providers/Auth'
import useTranslation from 'next-translate/useTranslation';

const LOGIN = gql`
  mutation login ($input: SessionInput!) {
    login (input: $input) {
      developerCode
      message
    }
  }
`

const Login = (): ReactElement => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [login, { data, loading, error }] = useMutation(LOGIN)
  const { t } = useTranslation()
  const { setAuthenticated } = useAuth()
  const router = useRouter()
  const submitHandler = async (event): Promise<void> => {
    event.preventDefault()
    await login({
      variables: {
        input: {
          cellPhone: username,
          password
        }
      }
    })
  }

  useEffect(() => {
    if (data !== undefined) {
      if (data.login.developerCode === 'SUCCESS_QUERY') {
        setAuthenticated(true)
        router.push('/profile')
      }
    }
  }, [data])

  if (loading) {
    return <h2>{t('common:loading')}</h2>
  }

  if (error) {
    console.error(error)
  }

  return (
    <Layout>
      <h1>{t('login:title')}</h1>
      <form onSubmit={submitHandler}>
        <div>
          <label>
            {t('login:lbl-username')}{' '}
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            {t('login:lbl-password')}{' '}
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </label>
        </div>
        <button type="submit">{t('login:btn-login')}</button>
      </form>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = withoutAuth

export default Login
