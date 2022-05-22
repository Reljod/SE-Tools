const PomodoroTitle = ( {children}: React.PropsWithChildren<{}> ) => {
  return (
    <h1 
      id="title" 
      className='text-center text-primary font-bold text-xl h-fit self-start md:text-3xl'
    >
      { children }
    </h1>
  );
}

export default PomodoroTitle;