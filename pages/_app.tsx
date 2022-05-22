import '../styles/globals.css'
import type { AppProps } from 'next/app'
import NavBar from 'components/shared/NavBar'
import Main from 'components/shared/Main'
import { useRouterCustom } from 'lib/hooks/router'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {

  const { routeTitle } = useRouterCustom()

  return <div data-theme="forest">
    <Head>
      <title>{routeTitle}</title>
    </Head>
    <NavBar/>
    <Main id={routeTitle}>
      <Component {...pageProps} />
    </Main>
  </div>
}

export default MyApp
