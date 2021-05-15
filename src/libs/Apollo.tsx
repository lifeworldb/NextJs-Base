// Libs
import { useMemo } from 'react'
import { ApolloClient, ApolloLink, createHttpLink, gql, InMemoryCache } from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { fromPromise } from '@apollo/client/link/utils'
// import fetch from 'isomorphic-fetch'

// eslint-disable-next-line prefer-const,import/no-mutable-exports
let apolloClient
let isRefreshing = false
let pendingRequests = []

const GET_TOKEN_QUERY = gql`
  mutation refreshToken {
    refreshToken {
      developerCode
      message
    }
  }
`

const getNewTokens = async (): Promise<unknown> => apolloClient.mutate({ mutation: GET_TOKEN_QUERY }).then(res => {
  const { refreshToken } = res.data
  return refreshToken
})

const resolvePendingRequests = (): void => {
  pendingRequests.map(callback => callback())
  pendingRequests = []
}

const hhpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
  fetch,
  credentials: 'include'
})

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      // eslint-disable-next-line consistent-return
      graphQLErrors.forEach(error => {
        // @ts-expect-error
        if (error.statusCode === 401) {
          // error code is set to UNAUTHENTICATED
          // when AuthenticationError thrown in resolver
          let forward$

          if (!isRefreshing) {
            isRefreshing = true
            forward$ = fromPromise(
              getNewTokens()
                .then(({ accessToken, refreshToken }) => {
                  // Store the new tokens for your auth link
                  resolvePendingRequests()
                  return accessToken
                })
                // eslint-disable-next-line no-shadow,node/handle-callback-err
                .catch(error => {
                  pendingRequests = []
                  // Handle token refresh errors e.g clear stored tokens, redirect to login, ...
                })
                .finally(() => {
                  isRefreshing = false
                })
            ).filter(value => Boolean(value))
          } else {
            // Will only emit once the Promise is resolved
            forward$ = fromPromise(
              new Promise<void>(resolve => {
                pendingRequests.push(() => resolve())
              })
            )
          }

          return forward$.flatMap(() => forward(operation))
        }
      })
    }
    if (networkError) {
      // eslint-disable-next-line @typescript-eslint/no-base-to-string, @typescript-eslint/restrict-template-expressions
      console.log(`[Network error]: ${networkError}`)
      // if you would also like to retry automatically on
      // network errors, we recommend that you use
      // apollo-link-retry
    }
  }
)

apolloClient = new ApolloClient({
  link: ApolloLink.from([errorLink, hhpLink]),
  cache: new InMemoryCache()
})

export const useApollo = () => useMemo(() => apolloClient, [])
