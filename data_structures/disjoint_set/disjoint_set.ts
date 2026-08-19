const logger = console;
/**
 * A Disjoint Set is a data structure that keeps track of a set of elements
 * partitioned into a number of disjoint (non-overlapping) subsets.
 * Elements are uniquely represented by an index (0-based).
 *
 * The find operation uses path compression.
 * This allows the time complexity of the find operation be O(alpha(n)).
 * alpha(n) being the inverse Ackermann function.
 *
 * The join operation uses union by size: The smaller set is joined to the bigger one.
 *
 * You can perform the following operations on the disjoint set:
 * - find: Determine which subset a particular element is in - O(alpha(n))
 * - join: Join two subsets into a single subset - O(1)
 * - isSame: Check if two elements are in the same subset - O(1)
 */
export class DisjointSet {
  /** Direct parent for an element */
  private head: number[]

  /** Size of the subtree above an element */
  private size: number[]

  constructor(n: number) {
	logger.debug(`>>> Entering constructor(n=${n})`);
    // Initially each set has its own id element
    this.head = Array.from({ length: n }, (_, index) => index)
    this.size = Array(n).fill(1)
	logger.debug(`<<< Exiting constructor(n=${n})`);
  }

  /**
   * Find the representative index for an element
   */
  find(index: number): number {
    if (this.head[index] != index) {
	logger.debug(`>>> Entering find(index=${index})`);
      // Use path compression (set an edge between the element and its head)
      this.head[index] = this.find(this.head[index])
    }
	logger.debug(`<<< Exiting find(index=${index})`);
    return this.head[index]
  }

  /**
   * Join two sets
   */
  join(first: number, second: number): void {
    // Get the root of each set to join
    let firstHead = this.find(first)
    let secondHead = this.find(second)

	logger.debug(`join(first=${first},second=${second}): firstHead → ${firstHead}`);
	logger.debug(`join(first=${first},second=${second}): secondHead → ${secondHead}`);
    // If they're the same (same set)
    if (firstHead === secondHead) return

    // Keep the bigger set in firstHead
    if (this.size[firstHead] < this.size[secondHead]) {
	logger.debug(`>>> Entering join(first=${first},second=${second})`);
      ;[firstHead, secondHead] = [secondHead, firstHead]
    }

    // Join the smallest set with the bigger one
    this.head[secondHead] = firstHead

    // Update size of the bigger set after join
    this.size[firstHead] += this.size[secondHead]
	logger.debug(`<<< Exiting join(first=${first},second=${second})`);
  }

  /**
   * Check whether two elements are in the same set
   */
  isSame(first: number, second: number): boolean {
	logger.debug(`>>> Entering isSame(first=${first},second=${second})`);
	logger.debug(`<<< Exiting isSame(first=${first},second=${second})`);
    return this.find(first) === this.find(second)
  }
}
