const logger = console;
/**
 * @function factorial
 * @description Calculate the factorial of a natural number.
 * @param {number} num - A natural number.
 * @return {number} - The factorial.
 * @see https://en.wikipedia.org/wiki/factorial
 * @example factorial(0) = 1
 * @example factorial(3) = 6
 */
export const factorial = (num: number): number => {
logger.debug(`>>> Entering factorial(num=${num})`);
  if (num < 0 || !Number.isInteger(num)) {
    throw new Error('only natural numbers are supported')
  }

logger.debug(`<<< Exiting factorial(num=${num})`);
  return num === 0 ? 1 : num * factorial(num - 1)
}
