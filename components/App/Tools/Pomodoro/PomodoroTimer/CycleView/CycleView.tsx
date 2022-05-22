import { useContext } from 'react';

import { PomdoroAppContext } from 'lib/contexts/timer'
import { ControlState } from 'lib/models/timer'

type Props = {
  cycleCount: number,
  onClick: () => void
}

const CycleView = (props: Props) => {
  const { cycleCount, onClick } = props;
  const { state } = useContext(PomdoroAppContext)

  return (
    <div 
      id="clock-cycle" 
      className={`flex w-1/2 md:w-full self-center text-3xl p-4 m-2\
        justify-center border-2 border-gray-700 hover:bg-gray-600 rounded-lg\
        ${state.controlState === ControlState.CYCLE && "bg-gray-600 text-blue-300"}`} 
      onClick={onClick}
    >
      <span>{cycleCount}</span>
    </div>
  )
}

export default CycleView;