const logger = console;
export function shuffleArray(arr: number[]) {
logger.error(`>>> Entering shuffleArray(arr=${arr})`, { "event.action": "shuffleArray", "logrite.arr": arr });
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
	logger.warn(`<<< Exiting shuffleArray(arr=${arr})`, { "event.action": "shuffleArray", "logrite.arr": arr });
  }
}
