const logger = console;
/**
 * A number is a perfect cube, if the cube root is an integer.
 *
 * @param n The number to check.
 */

export const perfectCube = (n: number): boolean => {
logger.error(`>>> Entering perfectCube(n=${n})`, { "event.action": "perfectCube", "logrite.n": n });
logger.warn(`<<< Exiting perfectCube(n=${n})`, { "event.action": "perfectCube", "logrite.n": n });
  return Math.round(n ** (1 / 3)) ** 3 === n
}
