import React, { useContext, useEffect, useState } from 'react'

import ClockSlider from './ClockSlider'
import CycleView from './CycleView'
import MainClock from './MainClock'
import RunController from './RunController'
import SecondaryClock from './SecondaryClock'

import {
  MAIN_TIMER_SPEED,
  BREAK_TIMER_SPEED,
  ALERT_DURATION
} from 'configs/tools/pomodoro.config'
import { PomdoroAppContext } from 'lib/contexts/timer'
import { useTimer } from 'lib/hooks/timer'
import { 
  AppState,
  ClockState,
  RunState, 
  ControlState 
} from 'lib/models/timer'

type Props = {
  onPause: () => void,
  onResume: () => void,
  onStart: () => void,
  onStop: () => void,
  onMainClockEnd: () => void,
  onBreakClockEnd: () => void
}

const PomodoroTimer = ({
  onPause, onResume, onStart,
  onStop, onMainClockEnd, onBreakClockEnd
}: Props) => {
  const {state, setState, init} = useContext(PomdoroAppContext);
  const { mainInit, breakInit } = init;

  const [cycle, setCycle] = useState<number>(init.cycleInit);
  const [isMainClockRunning, setMainClockRunning] = useState<boolean>(false);
  const [isBreakClockRunning, setBreakClockRunning] = useState<boolean>(false);

  // Inline functions

  const onReduceCycle = () => {
    if (cycle === 0){
      setState.setClockState(ClockState.EndState);
      setTimeout(() => {
        setState.setAppState(AppState.ConfigState);
      }, ALERT_DURATION)
      return;
    }
    setCycle(cycle - 1)
  }

  const onMainEnd = () => {
    onMainClockEnd()
    onReduceCycle()
  }

  // Hooks

  const { 
    minutes: mainMinutes, 
    seconds: mainSeconds, 
    onReset: onMainReset
  } = useTimer(
    // Custom hook for creating Main Clock Timer. 
    { minutes: mainInit.minutes, seconds: mainInit.seconds },
    MAIN_TIMER_SPEED, isMainClockRunning, onMainEnd
  )

  const { 
    minutes: breakMinutes, 
    seconds: breakSeconds, 
    onReset: onBreakReset
  } = useTimer(
    // Custom hook for creating Break Clock Timer.
    { minutes: breakInit.minutes, seconds: breakInit.seconds },
    BREAK_TIMER_SPEED, isBreakClockRunning, onBreakClockEnd
  )

  useEffect(() => {
    setCycle(init.cycleInit);
  }, [init.cycleInit])

  useEffect(() => {
    // Handles the local state changes when App State changes.
    if (state.appState === AppState.ConfigState) {
      setMainClockRunning(false);
      setBreakClockRunning(false);
      onMainReset()
      onBreakReset()
      return;
    }
    
    if (state.clockState === ClockState.EndState) {
      setMainClockRunning(false);
      setBreakClockRunning(false);
      console.log("Alarm!");
      return;
    }

    if (state.clockState === ClockState.MainState){
      setBreakClockRunning(false);
      if (state.runState === RunState.Running) {
        setMainClockRunning(true);
      } else setMainClockRunning(false);
      onBreakReset()

    } else if (state.clockState === ClockState.BreakState){
      if (state.runState === RunState.Running) {
        setBreakClockRunning(true);
      } else setBreakClockRunning(false);
      setMainClockRunning(false);
      onMainReset()
    }

  }, [state])

  return (
    <section id="pomodoro-timer" className='flex flex-col md:flex-row'>
      <div className='flex flex-col items-center'>
        <MainClock 
          minutes={state.clockState === ClockState.MainState ? mainMinutes : breakMinutes} 
          seconds={state.clockState === ClockState.MainState ? mainSeconds : breakSeconds}
          onClick={() => {setState.setControlState(ControlState.MAIN_CLOCK)}}
        />
        <RunController
          onPause={onPause}
          onResume={onResume}
          onStart={onStart}
          onStop={onStop}
        />
        <ClockSlider/>
      </div>
      <div className='flex flex-row md:flex-col md:mt-8 md:ml-3'>
        <SecondaryClock 
          minutes={state.clockState === ClockState.BreakState ? mainMinutes : breakMinutes } 
          seconds={state.clockState === ClockState.BreakState ? mainSeconds : breakSeconds } 
          onClick={() => {setState.setControlState(ControlState.BREAK_CLOCK)}}
        />
        <CycleView 
          cycleCount={cycle} 
          onClick={() => {setState.setControlState(ControlState.CYCLE)}}
        />
      </div>
    </section>
  )
}

export default PomodoroTimer