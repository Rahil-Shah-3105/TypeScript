const logger = console;
/**
 * @author dev-madhurendra
 * Counting sort is an algorithm for sorting a collection
 * of objects according to keys that are small integers.
 * @see https://en.wikipedia.org/wiki/Counting_sort
 * @example
 * const array = [3, 0, 2, 5, 4, 1]
 * countingSort(array, 0, 5)
 */

export const countingSort = (inputArr: number[], min: number, max: number) => {
logger.debug(`>>> Entering countingSort(inputArr=${inputArr},min=${min},max=${max})`);
  const sortedArr = []

  const count = new Array(max - min + 1).fill(0)

logger.debug(`countingSort(inputArr=${inputArr},min=${min},max=${max}): count → ${count}`);
  for (const element of inputArr) count[element - min]++

  count[0] -= 1

  for (let i = 1; i < count.length; i++) count[i] += count[i - 1]

  for (let i = inputArr.length - 1; i >= 0; i--) {
    sortedArr[count[inputArr[i] - min]] = inputArr[i]
    count[inputArr[i] - min]--
  }

logger.debug(`<<< Exiting countingSort(inputArr=${inputArr},min=${min},max=${max})`);
  return sortedArr
}
