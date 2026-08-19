const logger = console;
/**
 * @function mergeSort
 * @description keeps on dividing the list into equal halves until it can no more be divided. By definition, if it is only one element in the list, it is sorted.
 * @see [Merge Sort](https://www.javatpoint.com/merge-sort)
 * @example MergeSort([8, 3, 5, 1, 4, 2]) = [1, 2, 3, 4, 5, 8]
 * @Complexity_Analysis
 * Space complexity - O(n)
 * Time complexity
 *      Best case   -   O(nlogn)
 *      Worst case  -   O(nlogn)
 *      Average case -  O(nlogn)
 *
 * Merge Sort is a recursive algorithm and time complexity can be expressed as following recurrence relation.
 * T(n) = 2T(n/2) + O(n)
 * The solution of the above recurrence is O(nLogn).
 */

export function mergeSort(array: number[]): number[] {
logger.debug(`>>> Entering mergeSort(array=${array})`);
  if (array.length <= 1) return array.slice()

  const midIndex = Math.floor(array.length / 2)
  const left = array.slice(0, midIndex)
  const right = array.slice(midIndex, array.length)

logger.debug(`mergeSort(array=${array}): midIndex → ${midIndex}`);
logger.debug(`mergeSort(array=${array}): left → ${left}`);
logger.debug(`mergeSort(array=${array}): right → ${right}`);
logger.debug(`<<< Exiting mergeSort(array=${array})`);
  return merge(mergeSort(left), mergeSort(right))
}

function merge(left: number[], right: number[]): number[] {
  const result = Array<number>(left.length + right.length)
  let curIndex = 0
logger.debug(`merge(left=${left},right=${right}): result → ${result}`);
  let leftIndex = 0
  let rightIndex = 0

  while (leftIndex < left.length && rightIndex < right.length) {
	logger.debug(`>>> Entering merge(left=${left},right=${right})`);
    if (left[leftIndex] < right[rightIndex]) {
      result[curIndex++] = left[leftIndex++]
    } else {
      result[curIndex++] = right[rightIndex++]
    }
  }
  while (leftIndex < left.length) {
    result[curIndex++] = left[leftIndex++]
  }
  while (rightIndex < right.length) {
    result[curIndex++] = right[rightIndex++]
  }

  return result
}
