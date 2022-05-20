import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

type Props = {}

const Hero = (props: Props) => {
  return (
	<section id='hero' className='flex flex-col-reverse items-center md:flex-row md:grid md:grid-cols-12 mt-20'>
		<div className='flex flex-col items-center justify-center md:justify-start md:col-span-4'>
			<h1 className='text-3xl md:text-5xl'>Welcome to <br/><span className='text-primary font-bold text-4xl md:text-6xl'> SE Tools </span>
			</h1>
			<h3 className='text-center w-screen text-gray-200 px-6 py-2 md:w-72 md:text-justify md:p-1'>
        Increase your productivity by trying out the various tools used by almost all Software
        Engineers in the world! This is still at the early development so expect things to be minimal
        at first.
			</h3>
      <Link href="#tools-grid">
        <button id='get-started' className='bg-primary text-gray-50 text-lg px-4 py-1 my-1 rounded-full hover:bg-green-600 active:bg-green-700 md:my-2 md:text-xl'>
          Get started
        </button>
      </Link>
		</div>
		<div className='md:ml-10 md:col-span-8'>
			<Image src='/images/tool-home.png' width='700' height='350'></Image>
		</div>
	</section>
  )
}

export default Hero