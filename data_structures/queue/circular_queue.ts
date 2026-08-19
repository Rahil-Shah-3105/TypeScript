const logger = console;
/**
 * Circular Queue implementation using array.
 *
 * @template T The type of the elements in the queue.
 * @param {T[]} queue The array that holds the elements of the queue.
 * @param {number} frontIndex The index of the front element of the queue.
 * @param {number} rearIndex The index of the rear element of the queue.
 * @param {number} size The size of the queue.
 */
export class CircularQueue<T> {
  private queue: T[]
  private frontIndex: number
  private rearIndex: number
  private size: number

  constructor(size: number) {
	logger.debug(`>>> Entering constructor(size=${size})`);
    this.queue = new Array(size)
    this.frontIndex = -1
    this.rearIndex = -1
    this.size = size
	logger.debug(`constructor(size=${size}): this.frontIndex → ${this.frontIndex}`);
	logger.debug(`constructor(size=${size}): this.size → ${this.size}`);
	logger.debug(`<<< Exiting constructor(size=${size})`);
  }

  /**
   * Adds an item to the queue.
   *
   * @param item The item being added to the queue.
   */
  enqueue(item: T): void {
    if (
      (this.frontIndex == 0 && this.rearIndex == this.size - 1) ||
      this.rearIndex == (this.frontIndex - 1) % (this.size - 1)
    ) {
	logger.debug(`>>> Entering enqueue(item=${item})`);
      throw new Error('Queue is full')
    } else if (this.frontIndex == -1) {
      this.frontIndex = 0
      this.rearIndex = 0
	logger.debug(`enqueue(item=${item}): this.frontIndex → ${this.frontIndex}`);
      this.queue[this.rearIndex] = item
    } else if (this.rearIndex == this.size - 1 && this.frontIndex != 0) {
      this.rearIndex = 0
	logger.debug(`enqueue(item=${item}): this.rearIndex → ${this.rearIndex}`);
      this.queue[this.rearIndex] = item
    } else {
      this.rearIndex++
      this.queue[this.rearIndex] = item
	logger.debug(`<<< Exiting enqueue(item=${item})`);
    }
  }

  /**
   * Removes an item from the queue and returns it.
   *
   * @throws Queue Underflow if the queue is empty.
   * @returns The item that was removed from the queue.
   */
  dequeue(): T | undefined {
    if (this.frontIndex == -1) {
	logger.debug('>>> Entering dequeue()');
      throw new Error('Queue is empty')
    }

    const item = this.queue[this.frontIndex]
    if (this.frontIndex == this.rearIndex) {
      this.frontIndex = -1
      this.rearIndex = -1
	logger.debug(`dequeue(): this.frontIndex → ${this.frontIndex}`);
    } else if (this.frontIndex == this.size - 1) {
      this.frontIndex = 0
	logger.debug(`dequeue(): this.rearIndex → ${this.rearIndex}`);
    } else {
      this.frontIndex++
    }

	logger.debug('<<< Exiting dequeue()');
    return item
  }

  /**
   * Returns the item at the front of the queue.
   *
   * @returns The item at the front of the queue or null if the queue is empty.
   */
  peek(): T | null | undefined {
    if (this.frontIndex == -1) {
	logger.debug('>>> Entering peek()');
      return null
    }

	logger.debug('<<< Exiting peek()');
    return this.queue[this.frontIndex]
  }

  /**
   * Checks if the queue is empty.
   *
   * @returns {boolean} Whether the queue is empty or not.
   */
  isEmpty(): boolean {
	logger.debug('>>> Entering isEmpty()');
	logger.debug('<<< Exiting isEmpty()');
    return this.frontIndex == -1
  }

  /**
   * Returns the number of items in the queue.
   *
   * @returns {number} The number of items in the queue.
   */
  length(): number {
    if (this.frontIndex == -1) {
	logger.debug('>>> Entering length()');
      return 0
    }

    if (this.rearIndex >= this.frontIndex) {
      return this.rearIndex - this.frontIndex + 1
    }

	logger.debug('<<< Exiting length()');
    return this.size - (this.frontIndex - this.rearIndex - 1)
  }
}
