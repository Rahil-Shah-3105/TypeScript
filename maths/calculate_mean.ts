const logger = console;
/**
 * @function calculateMean
 * @description This script will find the mean value of a array of numbers.
 * @param {number[]} numbers - Array of numeric values
 * @return {number} - mean of input numbers
 * @see [Mean](https://en.wikipedia.org/wiki/Mean)
 * @example calculateMean([1, 2, 4, 5]) = 3
 * @example calculateMean([10, 40, 100, 20]) = 42.5
 */

export const calculateMean = (numbers: number[]): number => {
logger.debug(`>>> Entering calculateMean(numbers=${numbers})`);
  if (numbers.length < 1) {
    throw new TypeError('Invalid Input')
  }

  // This loop sums all values in the 'numbers' array using an array reducer
  const sum = numbers.reduce((sum, current) => sum + current, 0)

logger.debug(`calculateMean(numbers=${numbers}): sum → ${sum}`);
  // Divide sum by the length of the 'numbers' array.
logger.debug(`<<< Exiting calculateMean(numbers=${numbers})`);
  return sum / numbers.length
}
