import { useContext } from 'react';
import { convertTimeToTimerFormat } from 'lib/helpers';
import { PomdoroAppContext } from 'lib/contexts/timer'
import { ControlState } from 'lib/models/timer'

type Props = {
  minutes: number,
  seconds: number,
  onClick: () => void
}

const SecondaryClock = (props: Props) => {
  const { minutes, seconds, onClick } = props;
  const { state } = useContext(PomdoroAppContext)

  return (
    <div 
      id="break-clock" 
      className={`flex w-1/2 md:w-full self-center text-3xl p-4 m-2 \
        border-2 border-gray-700 hover:bg-gray-600 rounded-lg \
        ${state.controlState === ControlState.BREAK_CLOCK && "bg-gray-600 text-blue-300"}`} 
      onClick={onClick}
    >
      <p className='text-center mx-auto'>{convertTimeToTimerFormat(minutes, seconds)}</p>
    </div>
  )
}

export default SecondaryClock;