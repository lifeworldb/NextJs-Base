// Libs
import { ReactElement } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Trans from 'next-translate/Trans'
import useTranslation from 'next-translate/useTranslation'
// Components
import { addCount } from '@store/count/action'
import Layout from '../components/Layout'

const Home = (): ReactElement => {
  // @ts-expect-error
  const { count } = useSelector(state => state.count)
  const { t } = useTranslation()
  const dispatch = useDispatch()
  return (
    <Layout>
      <h1 className="title">
        <Trans
          i18nKey="home:title"
          components={{
            a: <a href="https://nextjs.org" />
          }}
        />
      </h1>

      <h2>{t('common:greeting')}</h2>

      <p className="description">
        <Trans
          i18nKey="home:p1"
          components={{
            code: <code />
          }}
        />
      </p>

      <p>{t('home:p2-counter', { count })}</p>
      {/* eslint-disable-next-line react/button-has-type */}
      <button onClick={() => dispatch(addCount())}>{t('home:btn-counter')}</button>
    </Layout>
  )
}

export default Home
