import React from 'react'
import Main from '../components/shared/Main'

type Props = {}

function About({}: Props) {
  return (
  <Main id="about-page">
    <div className="flex item-center justify-center">
      <h1 className="text-5xl">
        About Page
      </h1>
    </div>
  </Main>
  )
}

export default About