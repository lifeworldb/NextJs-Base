// Libs
import { ReactElement } from 'react'
import { useDispatch, useSelector } from 'react-redux';
// Components
import Layout from '../components/Layout'
import { addCount } from '@store/count/action';

const Home = (): ReactElement => {
  // @ts-expect-error
  const { count } = useSelector(state => state.count)
  const dispatch = useDispatch()
  return (
    <Layout>
      <h1 className="title">
        Welcome to <a href="https://nextjs.org">Next.js!</a>
      </h1>

      <p className="description">
        Get started by editing <code>pages/index.js</code>
      </p>

      <p>Count state: {count}</p>
      {/* eslint-disable-next-line react/button-has-type */}
      <button onClick={() => dispatch(addCount())}>Increment Count</button>
    </Layout>
  )
}

export default Home
