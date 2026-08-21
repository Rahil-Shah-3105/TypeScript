const logger = console;
/**
 * This is an array-based implementation of a Queue.
 * A Queue is a data structure that follows the FIFO (First In First Out) principle.
 * It means that the first element that was added to the queue will be the first one to be removed.
 * The time complexity of the operations is O(n).
 */
import { Queue } from './queue'
export class ArrayQueue<T> implements Queue<T> {
  private queue: T[] = []

  /**
   * Returns the number of items in the queue.
   *
   * @returns {number} The number of items in the queue.
   */
  length(): number {
	logger.debug('>>> Entering length()');
	logger.debug('<<< Exiting length()');
    return this.queue.length
  }

  /**
   * Checks if the queue is empty.
   *
   * @returns {boolean} Whether the queue is empty or not.
   */
  isEmpty(): boolean {
	logger.debug('>>> Entering isEmpty()');
	logger.debug('<<< Exiting isEmpty()');
    return this.queue.length === 0
  }

  /**
   * Adds an item to the queue.
   *
   * @param item The item being added to the queue.
   */
  enqueue(item: T): void {
	logger.debug(`>>> Entering enqueue(item=${item})`);
    this.queue.push(item)
	logger.debug(`<<< Exiting enqueue(item=${item})`);
  }

  /**
   * Removes an item from the queue and returns it.
   *
   * @throws Queue Underflow if the queue is empty.
   * @returns The item that was removed from the queue.
   */
  dequeue(): T {
    if (this.isEmpty()) {
	logger.debug('>>> Entering dequeue()');
      throw new Error('Queue Underflow')
    }

	logger.debug('<<< Exiting dequeue()');
    return this.queue.shift() as T
  }

  /**
   * Returns the item at the front of the queue.
   *
   * @returns The item at the front of the queue or null if the queue is empty.
   */
  peek(): T | null {
    if (this.isEmpty()) {
	logger.debug('>>> Entering peek()');
      return null
    }

	logger.debug('<<< Exiting peek()');
    return this.queue[0]
  }
}
