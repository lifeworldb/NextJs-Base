import { GetServerSideProps, GetServerSidePropsContext } from 'next'

function hasAuth (context: GetServerSidePropsContext): boolean {
  return (!!context.req.cookies['access-token'] || !!context.req.cookies['refresh-token'])
}

export interface AuthServerSideProps {
  // eslint-disable-next-line @typescript-eslint/ban-types
  props?: {}
  // eslint-disable-next-line @typescript-eslint/ban-types
  redirect?: {}
}

export const withAuth: GetServerSideProps = async context => {
  // If authenticated, return empty props.
  if (hasAuth(context)) {
    return { props: {} }
  }

  // If not authenticated, redirect.
  return {
    redirect: {
      permanent: false,
      destination: '/login'
    }
  }
}

export const withoutAuth: GetServerSideProps = async context => {
  // If authenticated, return empty props.
  if (!hasAuth(context)) {
    return { props: {} }
  }

  // If not authenticated, redirect.
  return {
    redirect: {
      permanent: false,
      destination: '/profile'
    }
  }
}
