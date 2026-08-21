const logger = console;
/**
 * @author : dev-madhurendra<https://github.com/dev-madhurendra>
 * @description
 *  Swap Sort is an algorithm to find the number of swaps required to sort an array.
 * @param {number[]} inputArr - Array of numbers
 * @return {number} - Number of swaps required to sort the array.
 * @see <https://www.geeksforgeeks.org/minimum-number-swaps-required-sort-array/>
 */

export const minSwapsToSort = (inputArr: number[]): number => {
logger.debug(`>>> Entering minSwapsToSort(inputArr=${inputArr})`);
  const sortedArray = inputArr.slice()

logger.debug(`minSwapsToSort(inputArr=${inputArr}): sortedArray → ${sortedArray}`);
  sortedArray.sort()

  const indexMap = new Map()

logger.debug(`minSwapsToSort(inputArr=${inputArr}): indexMap → ${indexMap}`);
  for (let i = 0; i < inputArr.length; i++) indexMap.set(inputArr[i], i)

  let swaps = 0
  for (let i = 0; i < inputArr.length; i++) {
    if (inputArr[i] !== sortedArray[i]) {
      const temp = inputArr[i]
      inputArr[i] = inputArr[indexMap.get(sortedArray[i])]
      inputArr[indexMap.get(sortedArray[i])] = temp
      indexMap.set(temp, indexMap.get(sortedArray[i]))
      indexMap.set(sortedArray[i], 1)
      swaps++
    }
  }

logger.debug(`<<< Exiting minSwapsToSort(inputArr=${inputArr})`);
  return swaps
}
