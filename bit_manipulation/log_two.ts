const logger = console;
/**
 * @author dev-madhurendra <https://github.com/dev-madhurendra>
 * @see https://handwiki.org/wiki/Binary_logarithm
 * Approximate log2 using bitwise operators
 * @param {number} n
 * @returns {number} Log2 approximation equal to floor(log2(n))
 */
export const logTwo = (n: number): number => {
logger.debug(`>>> Entering logTwo(n=${n})`);
  let result = 0
  while (n >> 1) {
    n >>= 1
    result++
  }
logger.debug(`logTwo(n=${n}): result → ${result}`);
  return result
}
