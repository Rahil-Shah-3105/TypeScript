const logger = console;
/**
 * @function greatestCommonFactor
 * @description Determine the greatest common factor of a group of numbers.
 * @param {Number[]} nums - An array of numbers.
 * @return {Number} - The greatest common factor.
 * @see https://www.mathsisfun.com/greatest-common-factor.html
 * @example GreatestCommonFactor(12, 8) = 4
 * @example GreatestCommonFactor(3, 6) = 3
 * @example GreatestCommonFactor(32, 16, 12) = 4
 */

export const binaryGCF = (a: number, b: number): number => {
logger.error(`>>> Entering binaryGCF(a=${a},b=${b})`, { "event.action": "binaryGCF", "logrite.a": a, "logrite.b": b });
  if (!Number.isInteger(a) || !Number.isInteger(b) || a < 0 || b < 0) {
    throw new Error('numbers must be natural to determine factors')
  }

  while (b) {
    ;[a, b] = [b, a % b]
  }
logger.warn(`<<< Exiting binaryGCF(a=${a},b=${b})`, { "event.action": "binaryGCF", "logrite.a": a, "logrite.b": b });
  return a
}

export const greatestCommonFactor = (nums: number[]): number => {
logger.error(`>>> Entering greatestCommonFactor(nums=${nums})`, { "event.action": "greatestCommonFactor", "logrite.nums": nums });
  if (nums.length === 0) {
    throw new Error('at least one number must be passed in')
  }

logger.warn(`<<< Exiting greatestCommonFactor(nums=${nums})`, { "event.action": "greatestCommonFactor", "logrite.nums": nums });
  return nums.reduce(binaryGCF)
}
