import React from 'react'
import Main from '../components/Main'
import NavBar from '../components/NavBar'

type Props = {}

function About({}: Props) {
  return (
	<NavBar>
		<Main id="about-page">
			<div className="flex item-center justify-center">
				<h1 className="text-5xl">
					About Page
				</h1>
			</div>
		</Main>
	</NavBar>
  )
}

export default About