import React from 'react'

type Props = {
	children: React.ReactNode,
	id: string
}

const Main = (props: Props) => {
  return (
	<main id={props.id} className='container md:mx-auto px-1 py-6 lg:p-6 min-h-full max-h-screen min-w-screen '>
		{props.children}
	</main>
  )
}

export default Main