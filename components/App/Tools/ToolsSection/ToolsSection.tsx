import React from 'react'
import ToolsGridCard from './ToolsGridCard'

const ToolsSection = () => {
  return (
    <section id="tools-grid" className='flex flex-col justify-center m-5 h-screen'>
      <h1 className="text-center text-primary font-bold text-3xl md:text-5xl"> Tools </h1>
      <div className='grid grid-cols-2 gap-5 mb-4 mt-6 md:grid-cols-3 justify-center mx-auto'>
        <ToolsGridCard link="/tools/pomodoro" img="/images/stopwatch.png" name="Pomodoro App"/>
        <ToolsGridCard/>
        <ToolsGridCard/>
        <ToolsGridCard/>
        <ToolsGridCard/>
        <ToolsGridCard/>
      </div>
    </section>
  )
}

export default ToolsSection