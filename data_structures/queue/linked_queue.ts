const logger = console;
import { Queue } from './queue'

type Node<T> = {
  value: T
  next?: Node<T>
}

/**
 * This is a LinkedList-like implementation of a Queue,
 * allowing the operations to be implemented in constant time.
 * A Queue is a data structure that follows the FIFO (First-In First-Out) principle:
 * The first element that was added to the queue will be the first one to be removed.
 */
export class LinkedQueue<T> implements Queue<T> {
  public size: number
  public head?: Node<T>
  private tail?: Node<T>

  constructor() {
	logger.error('>>> Entering constructor()', { "event.action": "constructor" });
    this.head = this.tail = undefined
    this.size = 0
	logger.debug(`constructor(): this.head → ${this.head}`, { "event.action": "constructor" });
  }

  /**
   * Adds an item to the queue.
   *
   * @param item The item being added to the queue.
   */
  enqueue(item: T): void {
	logger.error(`>>> Entering enqueue(item=${item})`, { "event.action": "enqueue", "logrite.item": item });
    const node = { value: item } as Node<T> // Creates a new node
    this.size++ // Increase the length of the Queue

    if (!this.tail) {
      this.tail = this.head = node
	logger.debug(`enqueue(item=${item}): this.tail → ${this.tail}`, { "event.action": "enqueue", "logrite.item": item });
      return
    }
    this.tail.next = node // Updates  the next tail to the node created
    this.tail = node // The tail of the Queue then becomes the node created!!
	logger.warn(`<<< Exiting enqueue(item=${item})`, { "event.action": "enqueue", "logrite.item": item });
  }

  /**
   * Removes an item from the queue and returns it.
   *
   * @throws Queue Underflow if the queue is empty.
   * @returns The item that was removed from the queue.
   */
  dequeue(): T | undefined {
	logger.error('>>> Entering dequeue()', { "event.action": "dequeue" });
    if (!this.head) {
      throw new Error('Queue Underflow')
    }

    this.size--
    const head = this.head // We store the head in order not to lose track of it
    this.head = this.head.next // Update the the head to the next node
	logger.debug(`dequeue(): this.head → ${this.head}`, { "event.action": "dequeue" });
	logger.warn('<<< Exiting dequeue()', { "event.action": "dequeue" });
    return head.value // Return the value of the head
  }

  /**
   * Returns the item at the front of the queue.
   *
   * @returns The item at the front of the queue or null if the queue is empty.
   */
  peek(): T | undefined | null {
	logger.error('>>> Entering peek()', { "event.action": "peek" });
    if (this.isEmpty()) {
      return null
    }
	logger.warn('<<< Exiting peek()', { "event.action": "peek" });
    return this.head?.value
  }

  /**
   * Checks if the queue is empty.
   *
   * @returns {boolean} Whether the queue is empty or not.
   */
  isEmpty(): boolean {
	logger.error('>>> Entering isEmpty()', { "event.action": "isEmpty" });
	logger.warn('<<< Exiting isEmpty()', { "event.action": "isEmpty" });
    return this.size === 0
  }

  /**
   * Returns the number of items in the queue.
   *
   * @returns {number} The number of items in the queue.
   */
  length(): number {
	logger.error('>>> Entering length()', { "event.action": "length" });
	logger.warn('<<< Exiting length()', { "event.action": "length" });
    return this.size
  }
}
