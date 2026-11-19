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
	logger.error('>>> Entering isEmpty()', { "event.action": "isEmpty" });
	logger.warn('<<< Exiting isEmpty()', { "event.action": "isEmpty" });
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
	logger.error(`>>> Entering get(index=${index})`, { "event.action": "get", "logrite.index": index });
    if (index < 0 || index >= this.length) {
      return null
    }

    let currentNode: DoublyLinkedListNode<T> | undefined = this.head
    for (let i: number = 0; i < index; i++) {
      currentNode = currentNode?.next
    }

	logger.warn(`<<< Exiting get(index=${index})`, { "event.action": "get", "logrite.index": index });
    return currentNode?.value ?? null
  }

  /**
   * Inserts a node at the head of the list.
   * Time complexity: O(1)
   *
   * @param value The value of the node being inserted.
   */
  push(value: T): void {
	logger.error(`>>> Entering push(value=${value})`, { "event.action": "push", "logrite.value": value });
    const newNode = new DoublyLinkedListNode(value)

	logger.error(`push(value=${value}): newNode → ${newNode}`, { "event.action": "push", "logrite.value": value });
	logger.debug(`push(value=${value}): newNode.next → ${newNode.next}`, { "event.action": "push", "logrite.value": value });
    if (!this.head) {
      this.head = newNode
	logger.debug(`push(value=${value}): this.head → ${this.head}`, { "event.action": "push", "logrite.value": value });
      this.tail = newNode
    } else {
      this.head.prev = newNode
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
	logger.error('>>> Entering pop()', { "event.action": "pop" });
    if (!this.head) {
      throw new Error('Index out of bounds')
    }

    const removedNode = this.head

    if (this.head === this.tail) {
      this.tail = undefined
    } else {
      this.head.next!.prev = undefined
    }

    this.head = this.head.next
	logger.debug(`pop(): this.head → ${this.head}`, { "event.action": "pop" });
    this.length--

	logger.warn('<<< Exiting pop()', { "event.action": "pop" });
    return removedNode.value
  }

  /**
   * Inserts a node at the tail of the list.
   * Time complexity: O(1)
   *
   * @param value The value of the node being inserted.
   */
  append(value: T): void {
	logger.error(`>>> Entering append(value=${value})`, { "event.action": "append", "logrite.value": value });
    const newNode = new DoublyLinkedListNode(value)

	logger.error(`append(value=${value}): newNode → ${newNode}`, { "event.action": "append", "logrite.value": value });
	logger.debug(`append(value=${value}): newNode.prev → ${newNode.prev}`, { "event.action": "append", "logrite.value": value });
    if (!this.head) {
      this.head = newNode
    } else {
      this.tail!.next = newNode
      newNode.prev = this.tail
    }

    this.tail = newNode
	logger.debug(`append(value=${value}): this.tail → ${this.tail}`, { "event.action": "append", "logrite.value": value });
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
	logger.error('>>> Entering removeTail()', { "event.action": "removeTail" });
    if (!this.head) {
      throw new Error('Index out of bounds')
    }

    const removedNode = this.tail

    if (this.head === this.tail) {
      this.head = undefined
    } else {
      this.tail!.prev!.next = undefined
    }

    this.tail = this.tail!.prev
	logger.debug(`removeTail(): this.tail → ${this.tail}`, { "event.action": "removeTail" });
    this.length--

	logger.warn('<<< Exiting removeTail()', { "event.action": "removeTail" });
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
	logger.error(`>>> Entering insertAt(index=${index},value=${value})`, { "event.action": "insertAt", "logrite.index": index, "logrite.value": value });
    if (index < 0 || index > this.length) {
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
	logger.error(`insertAt(index=${index},value=${value}): newNode → ${newNode}`, { "event.action": "insertAt", "logrite.index": index, "logrite.value": value });
	logger.debug(`insertAt(index=${index},value=${value}): newNode.prev → ${newNode.prev}`, { "event.action": "insertAt", "logrite.index": index, "logrite.value": value });
	logger.debug(`insertAt(index=${index},value=${value}): newNode.next → ${newNode.next}`, { "event.action": "insertAt", "logrite.index": index, "logrite.value": value });
    for (let i: number = 0; i < index - 1; i++) {
      prevNode = prevNode?.next
    }
    const nextNode = prevNode?.next

    prevNode!.next = newNode
    newNode.prev = prevNode
    newNode.next = nextNode
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

    let removedNode: DoublyLinkedListNode<T> | undefined = this.head
    for (let i: number = 0; i < index; i++) {
      removedNode = removedNode?.next
    }
    removedNode!.prev!.next = removedNode!.next
    removedNode!.next!.prev = removedNode!.prev

    this.length--

	logger.warn(`<<< Exiting removeAt(index=${index})`, { "event.action": "removeAt", "logrite.index": index });
    return removedNode!.value
  }

  /**
   * Reverses the list.
   * Time complexity: O(n)
   *
   * @returns The reversed list or null if the list is empty.
   */
  reverse(): DoublyLinkedList<T> | null {
	logger.error('>>> Entering reverse()', { "event.action": "reverse" });
    if (!this.head) {
      return null
    }

    let currentNode: DoublyLinkedListNode<T> | undefined = this.head
    let nextNode: DoublyLinkedListNode<T> | undefined = undefined
    let prevNode: DoublyLinkedListNode<T> | undefined = undefined

    while (currentNode) {
      nextNode = currentNode.next
      prevNode = currentNode.prev

      currentNode.next = prevNode
      currentNode.prev = nextNode

      prevNode = currentNode
      currentNode = nextNode
	logger.debug(`reverse(): currentNode.next → ${currentNode.next}`, { "event.action": "reverse" });
    }

	logger.debug(`reverse(): currentNode.prev → ${currentNode.prev}`, { "event.action": "reverse" });
    this.tail = this.head
	logger.debug(`reverse(): this.tail → ${this.tail}`, { "event.action": "reverse" });
    this.head = prevNode
	logger.debug(`reverse(): this.head → ${this.head}`, { "event.action": "reverse" });

	logger.warn('<<< Exiting reverse()', { "event.action": "reverse" });
    return this
  }

  /**
   * Clears the list.
   */
  clear(): void {
	logger.error('>>> Entering clear()', { "event.action": "clear" });
    this.head = undefined
    this.tail = undefined
	logger.debug(`clear(): this.head → ${this.head}`, { "event.action": "clear" });
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

    let currentNode: DoublyLinkedListNode<T> | undefined = this.head

    while (currentNode) {
      array.push(currentNode.value)
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
