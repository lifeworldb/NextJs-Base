// Libs
import { ReactElement } from 'react'
import { GetServerSideProps } from 'next'
import { gql, useQuery } from '@apollo/client'
import useTranslation from 'next-translate/useTranslation'
// Custom Functions
import { withAuth } from '../lib'
// Components
import Layout from '../components/Layout'

const ME = gql`
  query me {
    me {
      ... on Response {
        developerCode
        message
      }
      ... on User {
        id
        name
      }
    }
  }
`

const Profile = (): ReactElement => {
  const { t } = useTranslation()
  const { data, loading, error } = useQuery(ME, { pollInterval: 2000 })

  if (loading) {
    return <h2>{t('common:loading')}</h2>
  }

  if (error) {
    console.error(error)
  }

  const { me } = data

  return (
    <Layout>
      <h1>{t('profile:title')}</h1>
      <h2>{t('profile:name', { name: me.name })}</h2>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = withAuth

export default Profile
