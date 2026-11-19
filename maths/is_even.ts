const logger = console;
/**
 * @function isEven
 * @description Determine whether a number is even.
 * @param {Number} num - A number.
 * @return {Boolean} - Whether the given number is even.
 * @see https://en.wikipedia.org/wiki/Parity_(mathematics)
 * @example isEven(1) = false
 * @example isEven(2) = true
 */
export const isEven = (num: number): boolean => {
logger.error(`>>> Entering isEven(num=${num})`, { "event.action": "isEven", "logrite.num": num });
  if (!Number.isInteger(num)) {
    throw new Error('only integers can be even or odd')
  }

logger.warn(`<<< Exiting isEven(num=${num})`, { "event.action": "isEven", "logrite.num": num });
  return num % 2 === 0
}
