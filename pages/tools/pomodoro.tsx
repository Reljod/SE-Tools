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
  MAIN_CLOCK = 1,
  BREAK_CLOCK,
  CYCLE
}

function convertTimeToTimerFormat(minutes: number, seconds: number): string {
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

const Button = (props: ButtonProps) => {
  let color = "bg-green-800"
  if (props.type === ButtonType.STOP) {
    color = "bg-red-600"
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
  const [isTimerStart, setIsTimerStart] = useState<boolean>(false);
  const [curControl, setCurControl] = useState<Controls>(Controls.MAIN_CLOCK);

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
  }

  // Effect hooks

  useEffect(() => {
    // Sets the default initial state of the Pomodoro timer.
    if (!isTimerStart) {
      setMinutes(timerInitialState.minutes);
      setSeconds(timerInitialState.seconds);
    }

  }, [isTimerStart, timerInitialState])

  useEffect(() => {
    // Performs the countdown of Pomodoro timer.
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

  return (
  <div>
    <NavBar>
      <Main id="pomodoro-app">
        <div className="grid grid-rows-5 w-fit h-full px-5 mx-auto">
          <h1 id="title" className='text-center text-primary font-bold text-3xl md:text-5xl'>Pomodoro App</h1>
          <section id="pomodoro-timer" className='flex flex-row'>
            <div className='flex flex-col items-center'>
              <div id="clock" className={`col-auto text-8xl md:text-9xl hover:bg-gray-600 ${(curControl == Controls.MAIN_CLOCK || isTimerStart) ? "text-green-300" : "text-white blur-sm"}`} onClick={() => setCurControl(Controls.MAIN_CLOCK)}>
                {convertTimeToTimerFormat(minutes, seconds)}
              </div>
              <div id="clock-controller" className='w-full px-5'>
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
                  <div id="clock-stopper" className="flex flex-col md:flex-row">
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
                  className="w-full"
                  type="range"
                  min={curControl === Controls.MAIN_CLOCK ? "5" : "1"}
                  max={curControl === Controls.MAIN_CLOCK ? "55" : curControl == Controls.BREAK_CLOCK ? "20" : "10"}
                  step={curControl === Controls.MAIN_CLOCK ? "5" : "1"}
                  id="customRange3"
                  value={curControl === Controls.MAIN_CLOCK ? timerInitialState.minutes : curControl == Controls.BREAK_CLOCK ? breakTimerInitialState.minutes: cycleCount }
                  onChange={onTimerControlChange}
                  disabled={isTimerStart}
                />
              </div>
            </div>
            <div className='flex flex-col justify-center ml-1'>
                <div id="break-clock" className={`flex text-3xl p-4 m-2 border-2 border-gray-700 hover:bg-gray-600 ${curControl === Controls.BREAK_CLOCK && "bg-gray-600 text-primary"}`} onClick={() => setCurControl(Controls.BREAK_CLOCK)}>
                  <p>{convertTimeToTimerFormat(breakMinutes, breakSeconds)}</p>
                  <div id="icon"></div>
                </div>
                <div id="clock-cycle" className={`flex text-3xl p-4 m-2 justify-center border-2 border-gray-700 hover:bg-gray-600 ${curControl === Controls.CYCLE && "bg-gray-600 text-primary"}`} onClick={() => setCurControl(Controls.CYCLE)}>
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