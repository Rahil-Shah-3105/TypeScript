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
	logger.error(`>>> Entering constructor(n=${n})`, { "event.action": "constructor", "logrite.n": n });
    // Initially each set has its own id element
    this.head = Array.from({ length: n }, (_, index) => index)
    this.size = Array(n).fill(1)
	logger.warn(`<<< Exiting constructor(n=${n})`, { "event.action": "constructor", "logrite.n": n });
  }

  /**
   * Find the representative index for an element
   */
  find(index: number): number {
	logger.error(`>>> Entering find(index=${index})`, { "event.action": "find", "logrite.index": index });
    if (this.head[index] != index) {
      // Use path compression (set an edge between the element and its head)
      this.head[index] = this.find(this.head[index])
    }
	logger.warn(`<<< Exiting find(index=${index})`, { "event.action": "find", "logrite.index": index });
    return this.head[index]
  }

  /**
   * Join two sets
   */
  join(first: number, second: number): void {
	logger.error(`>>> Entering join(first=${first},second=${second})`, { "event.action": "join", "logrite.first": first, "logrite.second": second });
    // Get the root of each set to join
    let firstHead = this.find(first)
    let secondHead = this.find(second)

	logger.error(`join(first=${first},second=${second}): firstHead → ${firstHead}`, { "event.action": "join", "logrite.first": first, "logrite.second": second });
    // If they're the same (same set)
    if (firstHead === secondHead) return

    // Keep the bigger set in firstHead
    if (this.size[firstHead] < this.size[secondHead]) {
      ;[firstHead, secondHead] = [secondHead, firstHead]
    }

    // Join the smallest set with the bigger one
    this.head[secondHead] = firstHead

    // Update size of the bigger set after join
    this.size[firstHead] += this.size[secondHead]
	logger.warn(`<<< Exiting join(first=${first},second=${second})`, { "event.action": "join", "logrite.first": first, "logrite.second": second });
  }

  /**
   * Check whether two elements are in the same set
   */
  isSame(first: number, second: number): boolean {
	logger.error(`>>> Entering isSame(first=${first},second=${second})`, { "event.action": "isSame", "logrite.first": first, "logrite.second": second });
	logger.warn(`<<< Exiting isSame(first=${first},second=${second})`, { "event.action": "isSame", "logrite.first": first, "logrite.second": second });
    return this.find(first) === this.find(second)
  }
}
