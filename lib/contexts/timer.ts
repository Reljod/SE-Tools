import React, { createContext } from 'react';

import { 
	AppState,
	ClockState,
	RunState, 
	ControlState,
	Timer
  } from 'lib/models/timer'

type State = {
	appState: AppState,
	clockState: ClockState,
	runState: RunState,
	controlState: ControlState
}

type SetState = {
	setAppState: React.Dispatch<React.SetStateAction<AppState>>
	setClockState: React.Dispatch<React.SetStateAction<ClockState>>
	setRunState: React.Dispatch<React.SetStateAction<RunState>>
	setControlState: React.Dispatch<React.SetStateAction<ControlState>>
}

type Init = {
	mainInit: Timer,
	breakInit: Timer,
	cycleInit: number
}

type SetInit = {
	setMainInit: React.Dispatch<React.SetStateAction<Timer>>
	setBreakInit: React.Dispatch<React.SetStateAction<Timer>>
	setCycleInit: React.Dispatch<React.SetStateAction<number>>
}

export type PomdoroAppContextType = {
	state: State,
	setState: SetState,
	init: Init,
	setInit: SetInit
}

export const PomdoroAppContext = createContext<PomdoroAppContextType>({} as PomdoroAppContextType);