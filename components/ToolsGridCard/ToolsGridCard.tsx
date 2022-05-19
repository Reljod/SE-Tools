import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
  link?: string,
  img?: string,
  name?: string
}

const ToolsGridCard: React.FC<Props> = ({link="/",img="/images/coming-soon.png", name="Coming Soon!"}) => {
  return (
  <Link href={link}>
    <button className='flex flex-col items-center justify-between h-44 py-4 bg-primary rounded-xl hover:bg-green-600 hover:ring-lime-300 hover:ring-2 shadow-lime-900 shadow-lg focus:bg-green-700'>
      <Image src={img} height="100" width="100"></Image>
      <h3 className='text-black text-sm md:text-lg font-bold'>{name}</h3>
    </button>
  </Link>
  )
}

export default ToolsGridCard