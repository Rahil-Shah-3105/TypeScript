const logger = console;
/**
 * @function isPerfectNumber
 * @abstract A function to determine if a number is a perfect number
 * @param {number} n
 *
 * @example console.log(isPerfectNumber(6)) => true
 * @example console.log(isPerfectNumber(28)) => true
 * @example console.log(isPerfectNumber(12))=> false
 */

export const isPerfectNumber = (n: number): boolean => {
logger.debug(`>>> Entering isPerfectNumber(n=${n})`);
  if (n <= 0 || !Number.isInteger(n)) {
    return false
  }
  let sum = 1
  const sqrt = Math.sqrt(n)
  for (let i = 2; i < sqrt; i++) {
logger.debug(`isPerfectNumber(n=${n}): sqrt → ${sqrt}`);
    if (n % i === 0) {
      sum += i + n / i
    }
  }
  if (sqrt === Math.floor(sqrt)) {
    sum += sqrt
  }

logger.debug(`<<< Exiting isPerfectNumber(n=${n})`);
  return sum === n
}
