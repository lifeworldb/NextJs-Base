// Libs
import { ReactElement, useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import { gql, useMutation } from '@apollo/client'
// Custom Functions
import { withoutAuth } from '../lib'
// Components
import Layout from '../components/Layout'
// Hooks
import { useAuth } from '../providers/Auth'

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
    return <h2>Loading...</h2>
  }

  if (error) {
    console.error(error)
  }

  return (
    <Layout>
      <h1>Login</h1>
      <form onSubmit={submitHandler}>
        <div>
          <label>
            Username{' '}
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Password{' '}
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </label>
        </div>
        <button type="submit">Login</button>
      </form>
    </Layout>
  )
}

export const getServerSideProps = withoutAuth

export default Login
