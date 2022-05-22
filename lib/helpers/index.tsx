const getLastPathFromUrl = (path: string): string => {
  const lastPath = path.split("/").pop() || ""
  return lastPath;
}

const capitalizeFirstLetter = (word: string): string => {
  return word.charAt(0).toUpperCase() + word.slice(1)
}

function convertTimeToTimerFormat(minutes: number, seconds: number): string {
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

export {
  getLastPathFromUrl,
  capitalizeFirstLetter,
  convertTimeToTimerFormat
}