const logger = console;
/**
 * Given a number n pairs of parentheses, generate all combinations of valid parentheses
 * @param {number} n: Number of given parentheses
 * @return {string[]} result: Array that contains all valid parentheses
 * @see https://leetcode.com/problems/generate-parentheses/
 */

const generateParentheses = (n: number): string[] => {
logger.debug(`>>> Entering generateParentheses(n=${n})`);
  const result: string[] = []

  const solve = (
    chars: string,
    openParentheses: number,
    closedParentheses: number
  ) => {
	logger.debug(`>>> Entering solve(chars=${chars},openParentheses=${openParentheses},closedParentheses=${closedParentheses})`);
    if (openParentheses === n && closedParentheses === n) {
      result.push(chars)
      return
    }

    if (openParentheses <= n) {
      solve(chars + '(', openParentheses + 1, closedParentheses)
    }

    if (closedParentheses < openParentheses) {
      solve(chars + ')', openParentheses, closedParentheses + 1)
    }
	logger.debug(`<<< Exiting solve(chars=${chars},openParentheses=${openParentheses},closedParentheses=${closedParentheses})`);
  }

  solve('', 0, 0)

logger.debug(`<<< Exiting generateParentheses(n=${n})`);
  return result
}

export { generateParentheses }
