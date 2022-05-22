import { ButtonType } from 'lib/models/buttons'

type Props = {
  onClick: () => void,
  label: string,
  type: ButtonType 
}

const StartStopButton = (props: Props) => {
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

export default StartStopButton