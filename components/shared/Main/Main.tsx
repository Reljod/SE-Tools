import React from 'react'

type Props = {
	children: React.ReactNode,
	id: string
}

const Main = (props: Props) => {
  return (
	<main id={props.id} className='container p-6 mx-auto h-full overflow-clip'>
		{props.children}
	</main>
  )
}

export default Main