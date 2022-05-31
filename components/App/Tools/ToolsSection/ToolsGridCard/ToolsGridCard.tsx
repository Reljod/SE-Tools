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
    <button className='flex flex-col items-center justify-between h-36 sm:h-44 md:h-52 py-4 bg-primary rounded-xl hover:bg-green-600 hover:ring-lime-300 hover:ring-2 shadow-lime-900 shadow-lg focus:bg-green-700 aspect-square'>
      <div className='inline-block w-3/5'>
        <Image src={img} height="100" width="100" layout='responsive' sizes='100vh'></Image>
      </div>
      <h3 className='text-black text-sm sm:text-lg md:text-xl font-bold'>{name}</h3>
    </button>
  </Link>
  )
}

export default ToolsGridCard