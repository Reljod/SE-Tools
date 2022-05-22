import React, { useState, useEffect, createContext } from 'react';
import Main from 'components/shared/Main'

import PomodoroTitle from 'components/App/Tools/Pomodoro/PomodoroTitle';
import PomdoroTimer from 'components/App/Tools/Pomodoro/PomodoroTimer'

import { PomdoroAppContext, PomdoroAppContextType } from 'lib/contexts/timer'

import { 
  AppState,
  ClockState,
  RunState, 
  ControlState,
  Timer
} from 'lib/models/timer'

type Props = {
  title: string
}

const Pomodoro = (props: Props) => {

  const [ appState, setAppState ] = useState<AppState>(AppState.ConfigState);
  const [ clockState, setClockState ] = useState<ClockState>(ClockState.MainState);
  const [ controlState, setControlState ] = useState<ControlState>(ControlState.NONE);
  const [ runState, setRunState ] = useState<RunState>(RunState.Idle);

  const [ mainInit, setMainInit ] = useState<Timer>({ minutes: 25, seconds: 0 });
  const [ breakInit, setBreakInit ] = useState<Timer>({ minutes: 5, seconds: 0 });
  const [ cycleInit, setCycleInit ] = useState<number>(5);

  const title = props.title || "Pomodoro App"

  const providerValue: PomdoroAppContextType = {
    state: { appState, clockState, controlState, runState },
    setState: { setAppState, setClockState, setControlState, setRunState },
    init: { mainInit, breakInit, cycleInit },
    setInit: { setMainInit, setBreakInit, setCycleInit }
  }

  const onPause = () => {
    setRunState(RunState.Paused);
  }

  const onResume = () => {
    setRunState(RunState.Running);
  }

  const onStart = () => {
    setAppState(AppState.RunningState);
    setRunState(RunState.Running);
    setControlState(ControlState.NONE);
  }

  const onStop = () => {
    setAppState(AppState.ConfigState);
    setRunState(RunState.Idle);
  }

  const onMainClockEnd = (): void => {
    setClockState(ClockState.BreakState);
  }

  const onBreakClockEnd = (): void => {
    setClockState(ClockState.MainState);
  }

  useEffect(() => {
    // Handles the relationship between states
    if (appState === AppState.ConfigState) {
      setRunState(RunState.Idle);
      setClockState(ClockState.MainState);
    }

  }, [appState])

  return (
    <PomdoroAppContext.Provider value={providerValue}>
      <Main id="pomodoro-app">
        <div className="flex flex-col w-fit justify-center h-screen mx-auto">
          <PomodoroTitle>{ title }</PomodoroTitle>
          <PomdoroTimer
            onPause={onPause}
            onResume={onResume}
            onStart={onStart}
            onStop={onStop}
            onMainClockEnd={onMainClockEnd}
            onBreakClockEnd={onBreakClockEnd}
          />
        </div>
      </Main>  
    </PomdoroAppContext.Provider>
  )
}

export default Pomodoro;