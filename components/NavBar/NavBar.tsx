import Link from 'next/link'
import React from 'react'

type Props = {
  children: JSX.Element
}

const NavBar = (props: Props): JSX.Element => {
  return (
    <>
      <nav className="relative container mx-auto p-6">
        <div className='flex items-center justify-between'>
          <span id="logo" className="text-4xl self-start text-primary-focus">
            <Link href="/">Reljod</Link>
          </span>
          <div className="hidden items-center space-x-5 md:flex">
            <Link href="/">Home</Link>
            <Link href="/about" className='link-nav-custom'>About</Link>
            <a href="">Tools</a>
          </div>
        </div>
      </nav>
      { props.children }
    </>
  )
}

export default NavBar