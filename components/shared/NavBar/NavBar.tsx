import Link from 'next/link'
import React from 'react'

const NavBar = (): JSX.Element => {
  return (
    <nav className="fixed p-2 px-8 block z-10 w-screen bg-stone-900">
      <div className='flex items-center justify-between'>
        <span id="logo" className="text-3xl self-start text-primary-focus md:text-4xl">
          <Link href="/">SE Tools</Link>
        </span>
        <div className="hidden items-center space-x-5 md:flex">
          <Link href="/">Home</Link>
          <Link href="/about" className='link-nav-custom'>About</Link>
          <Link href="/tools">Tools</Link>
        </div>
      </div>
    </nav>
  )
}

export default NavBar