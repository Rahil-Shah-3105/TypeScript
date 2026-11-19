const logger = console;
import { LinkedList } from './linked_list'

/**
 * Represents a node in a linked list.
 *
 * @template T The type of the data stored in the node.
 * @property data The data stored in the node.
 * @property next A reference to the next node in the list. Can reference to null, if there is no next element.
 */
class ListNode<T> {
  constructor(
    public data: T,
    public next?: ListNode<T>
  ) {}
}

/**
 * This is an implementation of a (singly) linked list.
 * A linked list is a data structure that stores each element with a pointer (or reference) to the next element
 * in the list. Therefore, it is a linear data structure, which can be resized dynamically during runtime, as there is
 * no fixed memory block allocated.
 *
 * @template T The type of the value of the nodes.
 * @property head The head of the list.
 * @property tail The tail of the list.
 * @property length The length of the list.
 */
export class SinglyLinkedList<T> implements LinkedList<T> {
  private head?: ListNode<T>
  private tail?: ListNode<T>
  private length: number

  /**
   * Creates a new, empty linked list.
   */
  constructor() {
    this.head = undefined
    this.tail = undefined
    this.length = 0
  }

  /**
   * Checks, if the list is empty.
   *
   * @returns Whether the list is empty or not.
   */
  isEmpty(): boolean {
	logger.error('>>> Entering isEmpty()', { "event.action": "isEmpty" });
	logger.warn('<<< Exiting isEmpty()', { "event.action": "isEmpty" });
    return !this.head
  }

  /**
   * Gets the data of the node at the given index.
   * Time complexity: linear (O(n))
   *
   * @param index The index of the node.
   * @returns The data of the node at the given index or null, if no data is present.
   */
  get(index: number): T | null {
	logger.error(`>>> Entering get(index=${index})`, { "event.action": "get", "logrite.index": index });
    if (index < 0 || index >= this.length) {
      return null
    }

    if (this.isEmpty()) {
      return null
    }

    let currentNode: ListNode<T> = this.head!
    for (let i: number = 0; i < index; i++) {
      if (!currentNode.next) {
        return null
      }

      currentNode = currentNode.next
    }

	logger.warn(`<<< Exiting get(index=${index})`, { "event.action": "get", "logrite.index": index });
    return currentNode.data
  }

  /**
   * Inserts the given data as the first node of the list.
   * Time complexity: constant (O(1))
   *
   * @param data The data to be inserted.
   */
  push(data: T): void {
	logger.error(`>>> Entering push(data=${data})`, { "event.action": "push" });
    const node: ListNode<T> = new ListNode<T>(data)

    if (this.isEmpty()) {
      this.head = node
	logger.debug(`push(data=${data}): this.head → ${this.head}`, { "event.action": "push" });
      this.tail = node
    } else {
      node.next = this.head
      this.head = node
    }

    this.length++
  }

  /**
   * Removes the first node of the list.
   * Time complexity: constant (O(1))
   *
   * @returns The data of the node that was removed.
   * @throws Index out of bounds if the list is empty.
   */
  pop(): T {
	logger.error('>>> Entering pop()', { "event.action": "pop" });
    if (this.isEmpty()) {
      throw new Error('Index out of bounds')
    }

    const node: ListNode<T> = this.head!
    this.head = this.head!.next
	logger.debug(`pop(): this.head → ${this.head}`, { "event.action": "pop" });
    this.length--

	logger.warn('<<< Exiting pop()', { "event.action": "pop" });
    return node.data
  }

  /**
   * Inserts the given data as a new node after the current TAIL.
   * Time complexity: constant (O(1))
   *
   * @param data The data of the node being inserted.
   */
  append(data: T): void {
	logger.error(`>>> Entering append(data=${data})`, { "event.action": "append" });
    const node: ListNode<T> = new ListNode<T>(data)

    if (this.isEmpty()) {
      this.head = node
    } else {
      this.tail!.next = node
    }

    this.tail = node
	logger.debug(`append(data=${data}): this.tail → ${this.tail}`, { "event.action": "append" });
    this.length++
  }

  /**
   * Removes the current TAIL of the list.
   * Time complexity: linear (O(n))
   *
   * @returns The data of the former TAIL.
   * @throws Index out of bounds if the list is empty.
   */
  removeTail(): T {
	logger.error('>>> Entering removeTail()', { "event.action": "removeTail" });
    if (!this.head) {
      throw new Error('Index out of bounds')
    }

    const currentTail = this.tail
    if (this.head === this.tail) {
      this.head = undefined
	logger.debug(`removeTail(): this.head → ${this.head}`, { "event.action": "removeTail" });
      this.tail = undefined
	logger.debug(`removeTail(): this.tail → ${this.tail}`, { "event.action": "removeTail" });
      this.length--

      return currentTail!.data
    }

    let currentNode: ListNode<T> = this.head
    while (currentNode.next !== currentTail) {
      currentNode = currentNode.next!
    }

    this.tail = currentNode
    this.length--

	logger.warn('<<< Exiting removeTail()', { "event.action": "removeTail" });
    return currentTail!.data
  }

  /**
   * Inserts the data as a new node at the given index.
   * Time complexity: O(n)
   *
   * @param index The index where the node is to be inserted.
   * @param data The data to insert.
   * @throws Index out of bounds, when given an invalid index.
   */
  insertAt(index: number, data: T): void {
	logger.error(`>>> Entering insertAt(index=${index},data=${data})`, { "event.action": "insertAt", "logrite.index": index });
    if (index < 0 || index > this.length) {
      throw new Error('Index out of bounds')
    }

    if (index === 0) {
      this.push(data)

      return
    }

    if (index === this.length) {
      this.append(data)

      return
    }

    const newNode = new ListNode<T>(data)
    let currentNode: ListNode<T> | undefined = this.head
	logger.error(`insertAt(index=${index},data=${data}): newNode → ${newNode}`, { "event.action": "insertAt", "logrite.index": index });
	logger.debug(`insertAt(index=${index},data=${data}): newNode.next → ${newNode.next}`, { "event.action": "insertAt", "logrite.index": index });
    for (let i: number = 0; i < index - 1; i++) {
      currentNode = currentNode?.next
    }

    const nextNode = currentNode?.next
    currentNode!.next = newNode
    newNode.next = nextNode

    this.length++
  }

  /**
   * Removes the node at the given index.
   * Time complexity: O(n)
   *
   * @param index The index of the node to be removed.
   * @returns The data of the removed node.
   * @throws Index out of bounds, when given an invalid index.
   */
  removeAt(index: number): T {
	logger.error(`>>> Entering removeAt(index=${index})`, { "event.action": "removeAt", "logrite.index": index });
    if (index < 0 || index >= this.length) {
      throw new Error('Index out of bounds')
    }

    if (index === 0) {
      return this.pop()
    }

    if (index === this.length - 1) {
      return this.removeTail()
    }

    let previousNode: ListNode<T> | undefined
    let currentNode: ListNode<T> | undefined = this.head
    for (let i: number = 0; i < index; i++) {
      if (i === index - 1) {
        previousNode = currentNode
      }

      currentNode = currentNode?.next
    }

    previousNode!.next = currentNode?.next
    this.length--

	logger.warn(`<<< Exiting removeAt(index=${index})`, { "event.action": "removeAt", "logrite.index": index });
    return currentNode!.data
  }

  /**
   * Clears the list.
   */
  clear(): void {
	logger.error('>>> Entering clear()', { "event.action": "clear" });
    this.head = undefined
    this.tail = undefined
	logger.debug(`clear(): this.head → ${this.head}`, { "event.action": "clear" });
	logger.debug(`clear(): this.tail → ${this.tail}`, { "event.action": "clear" });
    this.length = 0
	logger.debug(`clear(): this.length → ${this.length}`, { "event.action": "clear" });
  }

  /**
   * Converts the list to an array.
   *
   * @returns The array representation of the list.
   */
  toArray(): T[] {
	logger.error('>>> Entering toArray()', { "event.action": "toArray" });
    const array: T[] = []
    let currentNode: ListNode<T> | undefined = this.head

    while (currentNode) {
      array.push(currentNode.data)
      currentNode = currentNode.next
    }

	logger.warn('<<< Exiting toArray()', { "event.action": "toArray" });
    return array
  }

  /**
   * Gets the length of the list.
   *
   * @returns The length of the list.
   */
  getLength(): number {
	logger.error('>>> Entering getLength()', { "event.action": "getLength" });
	logger.warn('<<< Exiting getLength()', { "event.action": "getLength" });
    return this.length
  }
}
