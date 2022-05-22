import type { NextPage } from 'next'
import Head from 'next/head'
import Hero from 'components/App/Home/Hero'
import Main from 'components/shared/Main'

const Home: NextPage = () => {

  return (
    <div>
      <Head>
        <title>SE Tools</title>
      </Head>
      <Main id="home-page">
        <Hero/>
      </Main>  
    </div>
  )
}

export default Home
