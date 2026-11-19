const logger = console;
/**
 * @function lowestCommonMultiple
 * @description Determine the lowest common multiple of a group of numbers.
 * @param {Number[]} nums - An array of numbers.
 * @return {Number} - The lowest common multiple.
 * @see https://www.mathsisfun.com/least-common-multiple.html
 * @example LowestCommonMultiple(3, 4) = 12
 * @example LowestCommonMultiple(8, 6) = 24
 * @example LowestCommonMultiple(5, 8, 3) = 120
 */

import { greatestCommonFactor } from './greatest_common_factor'

//A naive solution which requires no additional mathematical algorithm

export const naiveLCM = (nums: number[]): number => {
logger.error(`>>> Entering naiveLCM(nums=${nums})`, { "event.action": "naiveLCM", "logrite.nums": nums });
  if (nums.some((num) => num < 0)) {
    throw new Error(
      'numbers must be positive to determine lowest common multiple'
    )
  }

  if (nums.length === 0) {
    throw new Error('at least one number must be passed in')
  }

  const max_num = Math.max(...nums)
  let current_num = max_num
logger.error(`naiveLCM(nums=${nums}): max_num → ${max_num}`, { "event.action": "naiveLCM", "logrite.nums": nums });

  while (true) {
    if (nums.every((num) => current_num % num === 0)) {
	logger.warn(`<<< Exiting naiveLCM(nums=${nums})`, { "event.action": "naiveLCM", "logrite.nums": nums });
      return current_num
    } else {
      current_num += max_num
    }
  }
}

//A typically more efficient solution which requires prior knowledge of GCF
//Note that due to utilizing GCF, which requires natural numbers, this method only accepts natural numbers.

export const binaryLCM = (a: number, b: number): number => {
logger.error(`>>> Entering binaryLCM(a=${a},b=${b})`, { "event.action": "binaryLCM", "logrite.a": a, "logrite.b": b });
logger.warn(`<<< Exiting binaryLCM(a=${a},b=${b})`, { "event.action": "binaryLCM", "logrite.a": a, "logrite.b": b });
  return (a * b) / greatestCommonFactor([a, b])
}

export const lowestCommonMultiple = (nums: number[]): number => {
logger.error(`>>> Entering lowestCommonMultiple(nums=${nums})`, { "event.action": "lowestCommonMultiple", "logrite.nums": nums });
  if (nums.length === 0) {
    throw new Error('at least one number must be passed in')
  }

logger.warn(`<<< Exiting lowestCommonMultiple(nums=${nums})`, { "event.action": "lowestCommonMultiple", "logrite.nums": nums });
  return nums.reduce(binaryLCM)
}
