const logger = console;
import { SinglyLinkedList } from '../list/singly_linked_list'

/**
 * This is an implementation of a stack, based on a linked list.
 * A stack is a linear data structure that works with the LIFO (Last-In-First-Out) principle.
 * A linked list is a linear data structure that works with the FIFO (First-In-First-Out) principle and uses references
 * to determine which element is next in the list.
 */
export class LinkedListStack<T> {
  private list: SinglyLinkedList<T>
  private limit: number

  /**
   * Creates a new stack object.
   */
  constructor(limit: number = Number.MAX_VALUE) {
	logger.debug(`>>> Entering constructor(limit=${limit})`);
    this.list = new SinglyLinkedList<T>()
    this.limit = limit
	logger.debug(`constructor(limit=${limit}): this.limit → ${this.limit}`);
	logger.debug(`<<< Exiting constructor(limit=${limit})`);
  }

  /**
   * Gets the top element of the stack.
   * Time complexity: constant (O(1))
   *
   * @returns The top element of the stack.
   */
  top(): T | null {
    if (this.list.isEmpty()) {
	logger.debug('>>> Entering top()');
      return null
    }

	logger.debug('<<< Exiting top()');
    return this.list.get(0)!
  }

  /**
   * Inserts a new element on the top of the stack.
   * Time complexity: constant (O(1))
   *
   * @param data The data of the element to insert.
   * @throws Stack overflow, if the new element does not fit in the limit.
   */
  push(data: T): void {
    if (this.list.getLength() + 1 > this.limit) {
	logger.debug(`>>> Entering push(data=${data})`);
      throw new Error('Stack overflow')
    }

    this.list.push(data)
	logger.debug(`<<< Exiting push(data=${data})`);
  }

  /**
   * Removes the top element from the stack.
   * Time complexity: constant (O(1))
   *
   * @returns The previous top element.
   * @throws Stack underflow, if the stack has no elements to pop.
   */
  pop(): T {
    if (this.list.isEmpty()) {
	logger.debug('>>> Entering pop()');
      throw new Error('Stack underflow')
    }

	logger.debug('<<< Exiting pop()');
    return this.list.pop()
  }

  /**
   * Gets the amount of elements in the stack.
   *
   * @returns The amount of elements in the stack.
   */
  length(): number {
	logger.debug('>>> Entering length()');
	logger.debug('<<< Exiting length()');
    return this.list.getLength()
  }

  /**
   * Gets whether the stack is empty or not.
   *
   * @returns Whether the stack is empty or not.
   */
  isEmpty(): boolean {
	logger.debug('>>> Entering isEmpty()');
	logger.debug('<<< Exiting isEmpty()');
    return this.list.isEmpty()
  }
}
