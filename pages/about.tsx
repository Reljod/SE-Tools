import React from 'react'
import NavBar from '../components/NavBar'

type Props = {}

function About({}: Props) {
  return (
	<NavBar>
		<main id="about-page container">
			<div className="flex item-center justify-center">
				<h1 className="text-5xl">
					About Page
				</h1>
			</div>
		</main>
	</NavBar>
  )
}

export default About