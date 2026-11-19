const logger = console;
/**
 * @description Fibonacci search algorithm for a sorted array.
 *
 * The algorithm searches for a specific value in a sorted array using Fibonacci numbers
 * to divide the array into smaller subarrays. This algorithm is useful for large arrays where
 * the cost of accessing elements is high.
 *
 * @param {number[]} array - sorted list of numbers
 * @param {number} target - target number to search for
 * @return {number | null} - index of the target number in the list, or null if not found
 * @see [FibonacciSearch](https://www.geeksforgeeks.org/fibonacci-search/)
 * @example fibonacciSearch([1,2,3], 2) => 1
 * @example fibonacciSearch([4,5,6], 2) => null
 */

export const fibonacciSearch = (
  array: number[],
  target: number
): number | null => {
logger.error(`>>> Entering fibonacciSearch(array=${array},target=${target})`, { "event.action": "fibonacciSearch", "logrite.array": array, "logrite.target": target });
  const arrayLength = array.length
  let a = 0 // (n-2)'th Fibonacci No.
logger.error(`fibonacciSearch(array=${array},target=${target}): a → ${a}`, { "event.action": "fibonacciSearch", "logrite.array": array, "logrite.target": target });
  let b = 1 // (n-1)'th Fibonacci No.
logger.error(`fibonacciSearch(array=${array},target=${target}): b → ${b}`, { "event.action": "fibonacciSearch", "logrite.array": array, "logrite.target": target });
  let c = a + b // n'th Fibonacci
logger.error(`fibonacciSearch(array=${array},target=${target}): c → ${c}`, { "event.action": "fibonacciSearch", "logrite.array": array, "logrite.target": target });

  while (c < arrayLength) {
    a = b
    b = c
    c = a + b
  }

  let offset = -1

  while (c > 1) {
    let i = Math.min(offset + a, arrayLength - 1)

    if (array[i] < target) {
      c = b
      b = a
      a = c - b
      offset = i
    } else if (array[i] > target) {
      c = a
      b = b - a
      a = c - b
    } else {
      // Element found then return index
      return i
    }
  }

  if (b && array[offset + 1] === target) {
    return offset + 1
  }

  // Element not found then return null
logger.warn(`<<< Exiting fibonacciSearch(array=${array},target=${target})`, { "event.action": "fibonacciSearch", "logrite.array": array, "logrite.target": target });
  return null
}
