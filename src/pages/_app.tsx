// Libs
import { ReactElement } from 'react'
import { AppContext, AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
// Components
import { wrapper } from '@store/store'
import { AuthProvider } from '../providers/Auth'
// Hooks
import { useApollo } from '../libs/Apollo'

const MyApp = ({ Component, pageProps }: AppProps): ReactElement => {
  const apolloClient = useApollo()
  return (
    <ApolloProvider client={apolloClient}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ApolloProvider>
  )
}

interface Props {
  pageProps: unknown
}

MyApp.getInitialProps = async ({ Component, ctx }: AppContext): Promise<Props> => {
  const pageProps = {
    ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {})
  }

  return {
    pageProps
  }
}

export default wrapper.withRedux(MyApp)
