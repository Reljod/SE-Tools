import type { NextPage } from 'next'
import Head from 'next/head'
import Hero from 'components/Hero'
import Main from 'components/Main'
import NavBar from 'components/NavBar'
import ToolsGridCard from 'components/ToolsGridCard'

const Home: NextPage = () => {

  return (
    <div>
      <Head>
        <title>SE Tools</title>
      </Head>
      <NavBar>
        <Main id="home-page">
          <Hero/>
          <section id="tools-grid" className='m-5'>
            <h1 className="text-center text-primary font-bold text-3xl md:text-5xl"> Tools </h1>
            <div className='grid grid-cols-2 gap-5 m-4 mt-6 md:grid-cols-3'>
              <ToolsGridCard link="/tools/pomodoro" img="/images/stopwatch.png" name="Pomodoro App"/>
              <ToolsGridCard/>
              <ToolsGridCard/>
              <ToolsGridCard/>
              <ToolsGridCard/>
              <ToolsGridCard/>
            </div>
          </section>
        </Main>
      </NavBar>  
    </div>
  )
}

export default Home
