
export type Timer = {
  minutes: number,
  seconds: number
}

export enum AppState {
  ConfigState = "ConfigState",
  RunningState = "RunningState"
}

export enum ClockState {
  MainState = "MainState",
  BreakState = "BreakState",
  EndState = "EndState"
}

export enum RunState {
  Idle = "Idle",
  Running = "Running",
  Paused = "Paused"
}

export enum ControlState {
  MAIN_CLOCK = "MAIN_CLOCK",
  BREAK_CLOCK = "BREAK_CLOCK",
  CYCLE = "CYCLE",
  NONE = "NONE"
}