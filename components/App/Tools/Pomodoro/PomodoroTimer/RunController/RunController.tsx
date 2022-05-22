import React, { useContext } from 'react'

import StartStopButton from 'components/shared/buttons/StartStopButton'
import { PomdoroAppContext } from 'lib/contexts/timer'
import { ButtonType } from 'lib/models/buttons'
import { RunState } from 'lib/models/timer'

type Props = {
  onStart: () => void,
  onPause: () => void,
  onResume: () => void,
  onStop: () => void
}

const RunController = ({ onStart, onPause, onResume, onStop }: Props) => {

  const { state } = useContext(PomdoroAppContext);

  return ( 
    <div id="clock-controller" className='w-3/5 px-5'>
      {(() => {
        if (state.runState === RunState.Idle) {
          return <StartStopButton label="Start" onClick={onStart} type={ButtonType.START} />
        } else if (state.runState === RunState.Paused) {
          return (
            <div id="clock-stopper" className="flex flex-row">
              <StartStopButton label="Resume" onClick={onResume} type={ButtonType.START}/>
              <StartStopButton label="Stop" onClick={onStop} type={ButtonType.STOP}/>
            </div>
          )
        } else if (state.runState === RunState.Running) { 
          return (<StartStopButton label="Pause" onClick={onPause} type={ButtonType.STOP}/>)
        }
      })()}
    </div>
  )
}

export default RunController;