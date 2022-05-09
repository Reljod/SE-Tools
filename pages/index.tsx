import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import NavBar from '../components/NavBar'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Reljod's Webpage</title>
      </Head>
      <NavBar>
        <main id="home-page" className='container p-6 mx-auto'>
          <section id="hero" className="flex flex-col-reverse items-center md:flex-row">
            <div className='flex flex-col items-center justify-center md:justify-start'>
              <h1 className='text-3xl md:text-5xl'>Welcome to <br/><span className='text-primary font-bold text-4xl md:text-6xl'> SE Tools </span>
              </h1>
              <h3 className='text-center w-screen text-gray-200 p-6 md:w-72 md:text-justify md:p-1'>
                Experience the set of tools that Software Engineers use in their everday work. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatem doloribus eveniet natus porro? Deserunt quos sequi possimus eius, in alias tempore distinctio cupiditate nisi a minus, quasi quibusdam et. Libero?
              </h3>
            </div>
            <div className='ml-5'>
              <Image src="/images/tool-home.png" width="700" height="350"></Image>
            </div>
          </section>
        </main>    
      </NavBar>  
    </div>
  )
}

export default Home
