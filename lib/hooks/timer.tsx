import { useState, useEffect } from 'react'

import { Timer } from 'lib/models/timer'

const TIMER_SPEED_DEFAULT_MS = 1000

const useTimer = (
    timerInitialState: Timer, 
    timerSpeed: number = TIMER_SPEED_DEFAULT_MS,
    isStart: boolean = false,
    onTimeEndCallback: () => void = (() => {})
  ): any => {

  const [minutes, setMinutes] = useState<number>(timerInitialState.minutes);
  const [seconds, setSeconds] = useState<number>(timerInitialState.seconds);

  const onReset = () => {
    setMinutes(timerInitialState.minutes);
    setSeconds(timerInitialState.seconds);
  }

  useEffect(() => {
    let myInterval = setInterval(() => {
      if (!isStart){
        clearInterval(myInterval);
        return;
      }
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else if (seconds === 0) {
        if (minutes === 0) {
          onTimeEndCallback();
          clearInterval(myInterval);
          return;
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, timerSpeed);

    return () => {
      clearInterval(myInterval);
    }

  }, [isStart, minutes, seconds])

  return {
    minutes, 
    seconds,
    onReset
  }

}

export {
  useTimer
}