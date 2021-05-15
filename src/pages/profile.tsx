// Libs
import { ReactElement } from 'react'
import { gql, useQuery } from '@apollo/client'
// Custom Functions
import { GetServerSideProps } from 'next'
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
  const { data, loading, error } = useQuery(ME, { pollInterval: 2000 })

  if (loading) {
    return <h2>Loading...</h2>
  }

  if (error) {
    console.error(error)
  }

  const { me } = data

  return (
    <Layout>
      <h1>Profile</h1>
      <h2>Name: {me.name}</h2>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = withAuth

export default Profile
