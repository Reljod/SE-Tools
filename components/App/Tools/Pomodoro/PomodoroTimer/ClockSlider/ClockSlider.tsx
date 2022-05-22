import { useContext, useEffect, useState } from 'react'

import { PomdoroAppContext } from 'lib/contexts/timer'
import { AppState, ControlState } from 'lib/models/timer'

type SliderConfig = {
  min: number,
  max: number,
  step: number
}

const MAIN_CLOCK_CONFIG: SliderConfig = { min: 5, max: 60, step: 5 };
const BREAK_CLOCK_CONFIG: SliderConfig = { min: 1, max: 20, step: 1 };
const CYCLE_CONFIG: SliderConfig = { min: 1, max: 10, step: 1 };

const ClockSlider = () => {
  const { state, setState, setInit, init } = useContext(PomdoroAppContext);

  const [ curConfig, setCurConfig ] = useState<SliderConfig>({...MAIN_CLOCK_CONFIG});
  const [ curValue, setCurValue ] = useState<number>(init.mainInit.minutes);

  const onTimerControlChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if ( state.controlState === ControlState.NONE ) {
      setState.setControlState(ControlState.MAIN_CLOCK);
    } else if ( state.controlState === ControlState.MAIN_CLOCK ) {
      setInit.setMainInit({...init.mainInit, minutes: Number(event.target.value)});
      setCurValue(init.mainInit.minutes);
    } else if ( state.controlState === ControlState.BREAK_CLOCK ){
      setInit.setBreakInit({...init.breakInit, minutes: Number(event.target.value)});
      setCurValue(init.breakInit.minutes);
    } else if ( state.controlState === ControlState.CYCLE ){
      setInit.setCycleInit(Number(event.target.value));
      setCurValue(init.cycleInit);
    }
  }

  useEffect(() => {
    if ( state.controlState === ControlState.MAIN_CLOCK ) {
      setCurConfig({...MAIN_CLOCK_CONFIG})
      setCurValue(init.mainInit.minutes);
    } else if ( state.controlState === ControlState.BREAK_CLOCK ){
      setCurConfig({...BREAK_CLOCK_CONFIG})
      setCurValue(init.breakInit.minutes);
    } else if ( state.controlState === ControlState.CYCLE ) {
      setCurConfig({...CYCLE_CONFIG})
      setCurValue(init.cycleInit);
    }
  }, [state.controlState])

  return (
    <div id="clock-setter" className='flex justify-center w-full my-3'>
      <label htmlFor="slider"></label>
      <input
        className="w-3/5 md:w-4/5"
        type="range"
        min={curConfig.min}
        max={curConfig.max}
        step={curConfig.step}
        id="customRange3"
        value={curValue}
        onChange={onTimerControlChange}
        disabled={state.appState === AppState.RunningState}
      />
    </div>
  )
}

export default ClockSlider;