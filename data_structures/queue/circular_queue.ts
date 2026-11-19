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
	logger.error(`>>> Entering constructor(size=${size})`, { "event.action": "constructor", "logrite.size": size });
    this.queue = new Array(size)
    this.frontIndex = -1
    this.rearIndex = -1
	logger.debug(`constructor(size=${size}): this.rearIndex → ${this.rearIndex}`, { "event.action": "constructor", "logrite.size": size });
	logger.debug(`constructor(size=${size}): this.frontIndex → ${this.frontIndex}`, { "event.action": "constructor", "logrite.size": size });
    this.size = size
	logger.debug(`constructor(size=${size}): this.size → ${this.size}`, { "event.action": "constructor", "logrite.size": size });
	logger.warn(`<<< Exiting constructor(size=${size})`, { "event.action": "constructor", "logrite.size": size });
  }

  /**
   * Adds an item to the queue.
   *
   * @param item The item being added to the queue.
   */
  enqueue(item: T): void {
	logger.error(`>>> Entering enqueue(item=${item})`, { "event.action": "enqueue", "logrite.item": item });
    if (
      (this.frontIndex == 0 && this.rearIndex == this.size - 1) ||
      this.rearIndex == (this.frontIndex - 1) % (this.size - 1)
    ) {
      throw new Error('Queue is full')
    } else if (this.frontIndex == -1) {
      this.frontIndex = 0
	logger.debug(`enqueue(item=${item}): this.frontIndex → ${this.frontIndex}`, { "event.action": "enqueue", "logrite.item": item });
      this.rearIndex = 0
	logger.debug(`enqueue(item=${item}): this.rearIndex → ${this.rearIndex}`, { "event.action": "enqueue", "logrite.item": item });
      this.queue[this.rearIndex] = item
    } else if (this.rearIndex == this.size - 1 && this.frontIndex != 0) {
      this.rearIndex = 0
      this.queue[this.rearIndex] = item
    } else {
      this.rearIndex++
      this.queue[this.rearIndex] = item
	logger.warn(`<<< Exiting enqueue(item=${item})`, { "event.action": "enqueue", "logrite.item": item });
    }
  }

  /**
   * Removes an item from the queue and returns it.
   *
   * @throws Queue Underflow if the queue is empty.
   * @returns The item that was removed from the queue.
   */
  dequeue(): T | undefined {
	logger.error('>>> Entering dequeue()', { "event.action": "dequeue" });
    if (this.frontIndex == -1) {
	logger.debug(`dequeue(): this.rearIndex → ${this.rearIndex}`, { "event.action": "dequeue" });
      throw new Error('Queue is empty')
    }

    const item = this.queue[this.frontIndex]
    if (this.frontIndex == this.rearIndex) {
      this.frontIndex = -1
	logger.debug(`dequeue(): this.frontIndex → ${this.frontIndex}`, { "event.action": "dequeue" });
      this.rearIndex = -1
    } else if (this.frontIndex == this.size - 1) {
      this.frontIndex = 0
    } else {
      this.frontIndex++
    }

	logger.warn('<<< Exiting dequeue()', { "event.action": "dequeue" });
    return item
  }

  /**
   * Returns the item at the front of the queue.
   *
   * @returns The item at the front of the queue or null if the queue is empty.
   */
  peek(): T | null | undefined {
	logger.error('>>> Entering peek()', { "event.action": "peek" });
    if (this.frontIndex == -1) {
      return null
    }

	logger.warn('<<< Exiting peek()', { "event.action": "peek" });
    return this.queue[this.frontIndex]
  }

  /**
   * Checks if the queue is empty.
   *
   * @returns {boolean} Whether the queue is empty or not.
   */
  isEmpty(): boolean {
	logger.error('>>> Entering isEmpty()', { "event.action": "isEmpty" });
	logger.warn('<<< Exiting isEmpty()', { "event.action": "isEmpty" });
    return this.frontIndex == -1
  }

  /**
   * Returns the number of items in the queue.
   *
   * @returns {number} The number of items in the queue.
   */
  length(): number {
	logger.error('>>> Entering length()', { "event.action": "length" });
    if (this.frontIndex == -1) {
      return 0
    }

    if (this.rearIndex >= this.frontIndex) {
      return this.rearIndex - this.frontIndex + 1
    }

	logger.warn('<<< Exiting length()', { "event.action": "length" });
    return this.size - (this.frontIndex - this.rearIndex - 1)
  }
}
