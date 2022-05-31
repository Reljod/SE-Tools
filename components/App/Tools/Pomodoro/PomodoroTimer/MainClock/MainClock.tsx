import { useContext, useEffect, useState } from 'react'

import { PomdoroAppContext } from 'lib/contexts/timer'
import { convertTimeToTimerFormat } from 'lib/helpers'
import { 
  AppState,
  ClockState,
  RunState, 
  ControlState,
} from 'lib/models/timer'

type Props = {
  minutes: number,
  seconds: number,
  onClick: () => void
}

const MainClock = ( { minutes, seconds, onClick }: Props) => {

  const { state } = useContext(PomdoroAppContext)
  const [ clockStyle, setClockStyle ] = useState<string>("text-white")

  useEffect(() => {  // Change Main Clock styling depending on State.
    if ( state.appState ===  AppState.ConfigState ){
      if ( state.controlState === ControlState.MAIN_CLOCK ) {
        setClockStyle("text-blue-300");
      } else if ( state.controlState === ControlState.NONE ) {
        setClockStyle("text-white");
      } else {
        setClockStyle("text-white blur-sm");
      }
    } else {
      if ( state.runState === RunState.Running ) {
        if (state.clockState === ClockState.MainState){
          setClockStyle("text-green-300")
        } else if (state.clockState === ClockState.BreakState) {
          setClockStyle("text-orange-300")
        } else if (state.clockState === ClockState.EndState) {
          setClockStyle("text-red-800")
        }
      } else if (state.runState === RunState.Paused) {
        setClockStyle("text-red-800")
      }
    }
  }, [state])

  return (
    <div 
      id="clock" 
      className={"col-auto text-5xl rounder-3xl sm:text-6xl md:text-9xl hover:bg-gray-800 " + `${clockStyle}`}
      onClick={onClick}
    >
      {(state.clockState !== ClockState.EndState) ? convertTimeToTimerFormat(minutes, seconds) : convertTimeToTimerFormat(0, 0)}
    </div>
  )
}

export default MainClock