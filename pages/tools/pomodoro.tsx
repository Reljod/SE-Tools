import React, { useState, useEffect } from 'react'
import Main from 'components/Main'
import NavBar from 'components/NavBar'

type Props = {}
type InitialTimer = {
  minutes: number,
  seconds: number
}
enum ButtonType {
  START = 1,
  STOP
}

type ButtonProps = {
  label: string,
  onClick: () => void,
  type: ButtonType 
}

enum Controls {
  MAIN_CLOCK,
  BREAK_CLOCK,
  CYCLE
}

enum ClockModes {
  MAIN_MODE,
  BREAK_MODE
}

function convertTimeToTimerFormat(minutes: number, seconds: number): string {
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

const Button = (props: ButtonProps) => {
  let color = "bg-green-800 hover:bg-lime-700"
  if (props.type === ButtonType.STOP) {
    color = "bg-red-600 hover:bg-red-800"
  }

  return (
    <button 
      id={props.label}
      type="button"
      onClick={props.onClick}
      className={color + " text-xl rounded-lg px-2 py-1 mx-1 my-1 w-full"}
    >{props.label}</button>
  )
}

const Pomodoro = (props: Props) => {
  const TIMER_SPEED_MS = 1000;

  // states
  const [
    timerInitialState, 
    setTimerInitialState
  ] = useState<InitialTimer>({
    minutes: 25,
    seconds: 0,
  });

  const [
    breakTimerInitialState, 
    setBreakTimerInitialState
  ] = useState<InitialTimer>({
    minutes: 5,
    seconds: 0
  })

  const [minutes, setMinutes] = useState<number>(timerInitialState.minutes);
  const [seconds, setSeconds] = useState<number>(timerInitialState.seconds);
  const [curCycle, setCurCycle] = useState<number>(5)
  const [breakMinutes, setBreakMinutes] = useState<number>(breakTimerInitialState.minutes);
  const [breakSeconds, setBreakSeconds] = useState<number>(breakTimerInitialState.seconds);
  const [cycleCount, setCycleCount] = useState<number>(curCycle);

  const [isCountingDown, setIsCountingDown] = useState<boolean>(false);
  const [isBreakCountingDown, setIsBreakCountingDown] = useState<boolean>(false);
  const [isTimerStart, setIsTimerStart] = useState<boolean>(false);
  const [isBreakTimerStart, setIsBreakTimerStart] = useState<boolean>(false);
  const [curControl, setCurControl] = useState<Controls>(Controls.MAIN_CLOCK);

  const [mode, setMode] = useState<ClockModes>(ClockModes.MAIN_MODE);

  // inline functions

  const onMainClockChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setTimerInitialState({
      ...timerInitialState,
      minutes: Number(event.target.value)
    });

    setMinutes(timerInitialState.minutes);
    setSeconds(timerInitialState.seconds);
  } 

  const onBreakClockChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setBreakTimerInitialState({
      ...breakTimerInitialState,
      minutes: Number(event.target.value)
    });

    setBreakMinutes(breakTimerInitialState.minutes);
  } 

  const onCycleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setCycleCount(Number(event.target.value))
    setCurCycle(cycleCount);
  } 

  const onTimerControlChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (curControl === Controls.MAIN_CLOCK) {
      onMainClockChange(event);
    } else if (curControl === Controls.BREAK_CLOCK) {
      onBreakClockChange(event);
    } else {
      onCycleChange(event);
    }
  }

  const onStartButtonClick = (): void => {
    setIsCountingDown(true);
    setIsTimerStart(true);
    setTimerInitialState({
      minutes: minutes,
      seconds: seconds
    })
  }

  const onPauseButtonClick = (): void => {
    setIsCountingDown(false);
  }

  const onResumeButtonClick = (): void => {
    setIsCountingDown(true);
  }

  const onStopButtonClick = (): void => {
    setIsCountingDown(false);
    setIsTimerStart(false);
    setMinutes(timerInitialState.minutes);
    setSeconds(timerInitialState.seconds);
  }

  const stopAll = (): void => {
    setIsCountingDown(false);
    setIsBreakCountingDown(false);
    setIsTimerStart(false);
    setIsBreakTimerStart(false);
  }

  useEffect(() => {
    // Performs setting of configuration by the changes of modes.

    // Main mode or Break -> Main
    if (mode === ClockModes.MAIN_MODE && isTimerStart){
      setIsBreakCountingDown(false);
      setIsCountingDown(true);
    } else if (mode === ClockModes.BREAK_MODE && isBreakTimerStart) {
      setIsBreakCountingDown(true);
      setIsCountingDown(false);
    }
  }, [mode, isTimerStart, isBreakTimerStart])

  useEffect(() => {
    // Performs the countdown of Pomodoro timer

    let myInterval = setInterval(() => {
      if (!isCountingDown){
        clearInterval(myInterval);
        return;
      }
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(myInterval);
          setMode(ClockModes.BREAK_MODE);
          setIsTimerStart(false);
          setIsBreakTimerStart(true);
          setBreakMinutes(breakTimerInitialState.minutes);
          setBreakSeconds(breakTimerInitialState.seconds);
          return;
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, TIMER_SPEED_MS);

    return () => {
      clearInterval(myInterval);
    }

  }, [isCountingDown, minutes, seconds])

  useEffect(() => {
    // Performs the countdown for Break timer

    let myInterval = setInterval(() => {
      if (!isBreakCountingDown){
        clearInterval(myInterval);
        return;
      }
      if (breakSeconds > 0) {
        setBreakSeconds(breakSeconds - 1);
      } else if (breakSeconds === 0) {
        if (breakMinutes === 0) {
          clearInterval(myInterval);
          setMode(ClockModes.MAIN_MODE);
          setIsTimerStart(true);
          setIsBreakTimerStart(false);
          
          if (cycleCount === 0){
            stopAll();
            return;
          }
          setMinutes(timerInitialState.minutes);
          setSeconds(timerInitialState.seconds);
          setCycleCount(cycleCount - 1);
          return;
        } else {
          setBreakMinutes(breakMinutes - 1);
          setBreakSeconds(59);
        }
      }
    }, TIMER_SPEED_MS);

    return () => {
      clearInterval(myInterval);
    }

  }, [isBreakCountingDown, breakMinutes, breakSeconds])

  return (
  <div>
    <NavBar>
      <Main id="pomodoro-app">
        <div className="flex flex-col w-fit justify-center h-screen mx-auto">
          <h1 id="title" className='text-center text-primary font-bold text-xl h-fit self-start md:text-3xl'>Pomodoro App</h1>
          <section id="pomodoro-timer" className='flex flex-col md:flex-row'>
            <div className='flex flex-col items-center'>
              <div id="clock" className={`col-auto text-8xl md:text-9xl hover:bg-gray-800 rounded-3xl ${(curControl == Controls.MAIN_CLOCK || isTimerStart) ? "text-green-300" : "text-white blur-sm"}`} onClick={() => setCurControl(Controls.MAIN_CLOCK)}>
                {convertTimeToTimerFormat(minutes, seconds)}
              </div>
              <div id="clock-controller" className='w-3/5 px-5'>
                { !isCountingDown ?
                  // default
                  <div id="clock-starter" className="flex justify-center w-full">
                    { !isTimerStart ?
                      // default
                      <Button
                        label="Start"
                        onClick={onStartButtonClick}
                        type={ButtonType.START}
                      /> :
                      <Button
                        label="Resume"
                        onClick={onResumeButtonClick}
                        type={ButtonType.START}
                      />
                    }
                  </div> :
                  <div id="clock-stopper" className="flex flex-row">
                    <Button
                      label="Pause"
                      onClick={onPauseButtonClick}
                      type={ButtonType.STOP}
                    />
                    <Button
                      label="Stop"
                      onClick={onStopButtonClick}
                      type={ButtonType.STOP}
                    />
                  </div>
                }
              </div>
              <div id="clock-setter" className='flex justify-center w-full my-3'>
                <label htmlFor="slider"></label>
                <input
                  className="w-3/5 md:w-4/5"
                  type="range"
                  min={curControl === Controls.MAIN_CLOCK ? "0" : "0"}
                  max={curControl === Controls.MAIN_CLOCK ? "60" : curControl == Controls.BREAK_CLOCK ? "20" : "10"}
                  step={curControl === Controls.MAIN_CLOCK ? "5" : "0"}
                  id="customRange3"
                  value={curControl === Controls.MAIN_CLOCK ? timerInitialState.minutes : curControl == Controls.BREAK_CLOCK ? breakTimerInitialState.minutes: cycleCount }
                  onChange={onTimerControlChange}
                  disabled={isTimerStart}
                />
              </div>
            </div>
            <div className='flex flex-row md:flex-col md:mt-8 md:ml-4'>
                <div id="break-clock" className={`flex w-1/2 md:w-full text-3xl p-4 m-2 border-2 border-gray-700 hover:bg-gray-600 rounded-lg ${curControl === Controls.BREAK_CLOCK && "bg-gray-600 text-primary"}`} onClick={() => setCurControl(Controls.BREAK_CLOCK)}>
                  <p>{convertTimeToTimerFormat(breakMinutes, breakSeconds)}</p>
                  <div id="icon"></div>
                </div>
                <div id="clock-cycle" className={`flex w-1/2 md:w-full text-3xl p-4 m-2 justify-center border-2 border-gray-700 hover:bg-gray-600 rounded-lg ${curControl === Controls.CYCLE && "bg-gray-600 text-primary"}`} onClick={() => setCurControl(Controls.CYCLE)}>
                  <p>{cycleCount}</p>
                </div>
            </div>
          </section>
        </div>
      </Main>
    </NavBar>
  </div>
  )
}

export default Pomodoro