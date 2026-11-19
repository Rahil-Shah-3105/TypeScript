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
	logger.error('>>> Entering length()', { "event.action": "length" });
	logger.warn('<<< Exiting length()', { "event.action": "length" });
    return this.queue.length
  }

  /**
   * Checks if the queue is empty.
   *
   * @returns {boolean} Whether the queue is empty or not.
   */
  isEmpty(): boolean {
	logger.error('>>> Entering isEmpty()', { "event.action": "isEmpty" });
	logger.warn('<<< Exiting isEmpty()', { "event.action": "isEmpty" });
    return this.queue.length === 0
  }

  /**
   * Adds an item to the queue.
   *
   * @param item The item being added to the queue.
   */
  enqueue(item: T): void {
	logger.error(`>>> Entering enqueue(item=${item})`, { "event.action": "enqueue", "logrite.item": item });
    this.queue.push(item)
	logger.warn(`<<< Exiting enqueue(item=${item})`, { "event.action": "enqueue", "logrite.item": item });
  }

  /**
   * Removes an item from the queue and returns it.
   *
   * @throws Queue Underflow if the queue is empty.
   * @returns The item that was removed from the queue.
   */
  dequeue(): T {
	logger.error('>>> Entering dequeue()', { "event.action": "dequeue" });
    if (this.isEmpty()) {
      throw new Error('Queue Underflow')
    }

	logger.warn('<<< Exiting dequeue()', { "event.action": "dequeue" });
    return this.queue.shift() as T
  }

  /**
   * Returns the item at the front of the queue.
   *
   * @returns The item at the front of the queue or null if the queue is empty.
   */
  peek(): T | null {
	logger.error('>>> Entering peek()', { "event.action": "peek" });
    if (this.isEmpty()) {
      return null
    }

	logger.warn('<<< Exiting peek()', { "event.action": "peek" });
    return this.queue[0]
  }
}
