const logger = console;
import { LinkedList } from './linked_list'

/**
 * This is an implementation of a Doubly Linked List.
 * A Doubly Linked List is a data structure that contains a head, tail and length property.
 * Linked Lists consist of nodes, and each node has a value and a pointer to the next and previous node (can be null).
 *
 * @see https://www.geeksforgeeks.org/doubly-linked-list/
 *
 * @template T The type of the value of the nodes.
 * @property head The head of the list.
 * @property tail The tail of the list.
 * @property length The length of the list.
 */
export class DoublyLinkedList<T> implements LinkedList<T> {
  private head?: DoublyLinkedListNode<T> = undefined
  private tail?: DoublyLinkedListNode<T> = undefined
  private length: number = 0

  /**
   * Checks if the list is empty.
   *
   * @returns {boolean} Whether the list is empty or not.
   */
  isEmpty(): boolean {
	logger.debug('>>> Entering isEmpty()');
	logger.debug('<<< Exiting isEmpty()');
    return !this.head
  }

  /**
   * Gets a value of a node at a specific index.
   * Time complexity: O(n)
   *
   * @param index The index of the node.
   * @returns The value of a node at the specified index.
   */
  get(index: number): T | null {
    if (index < 0 || index >= this.length) {
	logger.debug(`>>> Entering get(index=${index})`);
      return null
    }

    let currentNode: DoublyLinkedListNode<T> | undefined = this.head
    for (let i: number = 0; i < index; i++) {
      currentNode = currentNode?.next
    }

	logger.debug(`<<< Exiting get(index=${index})`);
    return currentNode?.value ?? null
  }

  /**
   * Inserts a node at the head of the list.
   * Time complexity: O(1)
   *
   * @param value The value of the node being inserted.
   */
  push(value: T): void {
    const newNode = new DoublyLinkedListNode(value)

	logger.debug(`push(value=${value}): newNode → ${newNode}`);
    if (!this.head) {
	logger.debug(`>>> Entering push(value=${value})`);
      this.head = newNode
      this.tail = newNode
    } else {
      this.head.prev = newNode
	logger.debug(`push(value=${value}): this.tail → ${this.tail}`);
      newNode.next = this.head
      this.head = newNode
    }

    this.length++
  }

  /**
   * Removes a node from the head of the list.
   * Time complexity: O(1)
   *
   * @returns The value of the node that was removed.
   * @throws Index out of bounds if the list is empty.
   */
  pop(): T {
    if (!this.head) {
	logger.debug('>>> Entering pop()');
      throw new Error('Index out of bounds')
    }

    const removedNode = this.head

    if (this.head === this.tail) {
      this.tail = undefined
    } else {
	logger.debug(`pop(): this.tail → ${this.tail}`);
      this.head.next!.prev = undefined
    }

    this.head = this.head.next
    this.length--

	logger.debug(`pop(): this.head → ${this.head}`);
	logger.debug('<<< Exiting pop()');
    return removedNode.value
  }

  /**
   * Inserts a node at the tail of the list.
   * Time complexity: O(1)
   *
   * @param value The value of the node being inserted.
   */
  append(value: T): void {
    const newNode = new DoublyLinkedListNode(value)

	logger.debug(`append(value=${value}): newNode → ${newNode}`);
    if (!this.head) {
	logger.debug(`>>> Entering append(value=${value})`);
      this.head = newNode
    } else {
	logger.debug(`append(value=${value}): this.head → ${this.head}`);
      this.tail!.next = newNode
      newNode.prev = this.tail
    }

    this.tail = newNode
	logger.debug(`append(value=${value}): this.tail → ${this.tail}`);
    this.length++
  }

  /**
   * Removes a node from the tail of the list.
   * Time complexity: O(1)
   *
   * @returns The value of the node that was removed.
   * @throws Index out of bounds if the list is empty.
   */
  removeTail(): T {
    if (!this.head) {
	logger.debug('>>> Entering removeTail()');
      throw new Error('Index out of bounds')
    }

    const removedNode = this.tail

    if (this.head === this.tail) {
      this.head = undefined
    } else {
	logger.debug(`removeTail(): this.head → ${this.head}`);
      this.tail!.prev!.next = undefined
    }

    this.tail = this.tail!.prev
    this.length--

	logger.debug(`removeTail(): this.tail → ${this.tail}`);
	logger.debug('<<< Exiting removeTail()');
    return removedNode!.value
  }

  /**
   * Inserts a node at a specific index.
   * Time complexity: O(n)
   *
   * @param index The index where the node will be inserted.
   * @param value The value of the node being inserted.
   * @throws Index out of bounds if the index is not valid.
   */
  insertAt(index: number, value: T): void {
    if (index < 0 || index > this.length) {
	logger.debug(`>>> Entering insertAt(index=${index},value=${value})`);
      throw new Error('Index out of bounds')
    }

    if (index === 0) {
      this.push(value)
      return
    }

    if (index === this.length) {
      this.append(value)
      return
    }

    const newNode = new DoublyLinkedListNode(value)
    let prevNode: DoublyLinkedListNode<T> | undefined = this.head
	logger.debug(`insertAt(index=${index},value=${value}): newNode → ${newNode}`);
    for (let i: number = 0; i < index - 1; i++) {
      prevNode = prevNode?.next
    }
    const nextNode = prevNode?.next

    prevNode!.next = newNode
    newNode.prev = prevNode
	logger.debug(`insertAt(index=${index},value=${value}): newNode.prev → ${newNode.prev}`);
    newNode.next = nextNode
	logger.debug(`insertAt(index=${index},value=${value}): newNode.next → ${newNode.next}`);
    nextNode!.prev = newNode

    this.length++
  }

  /**
   * Removes a node at a specific index.
   * Time complexity: O(n)
   *
   * @param index The index of the node to be removed.
   * @returns The value of the node that was removed.
   * @throws Index out of bounds if the index is not valid.
   */
  removeAt(index: number): T {
    if (index < 0 || index >= this.length) {
	logger.debug(`>>> Entering removeAt(index=${index})`);
      throw new Error('Index out of bounds')
    }

    if (index === 0) {
      return this.pop()
    }

    if (index === this.length - 1) {
      return this.removeTail()
    }

    let removedNode: DoublyLinkedListNode<T> | undefined = this.head
    for (let i: number = 0; i < index; i++) {
      removedNode = removedNode?.next
    }
    removedNode!.prev!.next = removedNode!.next
    removedNode!.next!.prev = removedNode!.prev

    this.length--

	logger.debug(`<<< Exiting removeAt(index=${index})`);
    return removedNode!.value
  }

  /**
   * Reverses the list.
   * Time complexity: O(n)
   *
   * @returns The reversed list or null if the list is empty.
   */
  reverse(): DoublyLinkedList<T> | null {
    if (!this.head) {
	logger.debug('>>> Entering reverse()');
      return null
    }

    let currentNode: DoublyLinkedListNode<T> | undefined = this.head
    let nextNode: DoublyLinkedListNode<T> | undefined = undefined
    let prevNode: DoublyLinkedListNode<T> | undefined = undefined

    while (currentNode) {
      nextNode = currentNode.next
      prevNode = currentNode.prev

      currentNode.next = prevNode
	logger.debug(`reverse(): currentNode.next → ${currentNode.next}`);
      currentNode.prev = nextNode
	logger.debug(`reverse(): currentNode.prev → ${currentNode.prev}`);

      prevNode = currentNode
      currentNode = nextNode
    }

    this.tail = this.head
    this.head = prevNode
	logger.debug(`reverse(): this.tail → ${this.tail}`);

	logger.debug(`reverse(): this.head → ${this.head}`);
    return this
  }

  /**
   * Clears the list.
   */
  clear(): void {
	logger.debug('>>> Entering clear()');
    this.head = undefined
    this.tail = undefined
    this.length = 0
	logger.debug(`clear(): this.length → ${this.length}`);
  }

  /**
   * Converts the list to an array.
   *
   * @returns The array representation of the list.
   */
  toArray(): T[] {
    const array: T[] = []

    let currentNode: DoublyLinkedListNode<T> | undefined = this.head

    while (currentNode) {
	logger.debug('>>> Entering toArray()');
      array.push(currentNode.value)
      currentNode = currentNode.next
    }

	logger.debug('<<< Exiting toArray()');
    return array
  }

  /**
   * Gets the length of the list.
   *
   * @returns The length of the list.
   */
  getLength(): number {
	logger.debug('>>> Entering getLength()');
	logger.debug('<<< Exiting getLength()');
    return this.length
  }
}

/**
 * Represents a node in a doubly linked list.
 *
 * @template T The type of the value stored in the node.
 * @property value The value stored in the node.
 * @property next The next node after this node.
 * @property prev The previous node before this node.
 */
class DoublyLinkedListNode<T> {
  constructor(
    public value: T,
    public next?: DoublyLinkedListNode<T>,
    public prev?: DoublyLinkedListNode<T>
  ) {}
}
