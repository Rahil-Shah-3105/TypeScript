const logger = console;
/**
 * Given a number n pairs of parentheses, generate all combinations of valid parentheses
 * @param {number} n: Number of given parentheses
 * @return {string[]} result: Array that contains all valid parentheses
 * @see https://leetcode.com/problems/generate-parentheses/
 */

const generateParentheses = (n: number): string[] => {
logger.error(`>>> Entering generateParentheses(n=${n})`, { "event.action": "generateParentheses", "logrite.n": n });
  const result: string[] = []

  const solve = (
    chars: string,
    openParentheses: number,
    closedParentheses: number
  ) => {
	logger.error(`>>> Entering solve(chars=${chars},openParentheses=${openParentheses},closedParentheses=${closedParentheses})`, { "event.action": "solve", "logrite.chars": chars, "logrite.openParentheses": openParentheses, "logrite.closedParentheses": closedParentheses });
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
	logger.warn(`<<< Exiting solve(chars=${chars},openParentheses=${openParentheses},closedParentheses=${closedParentheses})`, { "event.action": "solve", "logrite.chars": chars, "logrite.openParentheses": openParentheses, "logrite.closedParentheses": closedParentheses });
  }

  solve('', 0, 0)

logger.warn(`<<< Exiting generateParentheses(n=${n})`, { "event.action": "generateParentheses", "logrite.n": n });
  return result
}

export { generateParentheses }
