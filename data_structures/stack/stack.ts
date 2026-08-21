const logger = console;
/* Stack data-structure. It's work is based on the LIFO method (last-IN-first-OUT).
 * It means that elements added to the stack are placed on the top and only the
 * last element (from the top) can be reached. After we get access to the last
 * element, it pops from the stack.
 * This is a class-based implementation of a Stack.
 */
export class Stack<T> {
  private stack: T[] = []
  private limit: number

  /**
   * constructor of the stack, can set a limit, if not provided there is no limit to the stack.
   * @param {number} [limit=Number.MAX_VALUE] the limit of the stack
   */
  constructor(limit: number = Number.MAX_VALUE) {
	logger.debug(`>>> Entering constructor(limit=${limit})`);
    this.limit = limit
	logger.debug(`constructor(limit=${limit}): this.limit → ${this.limit}`);
  }

  /**
   * @function push
   * @description - adds a new element to the stack
   * @param {T} value - the new value to add
   */
  push(value: T) {
	logger.debug(`>>> Entering push(value=${value})`);
    if (this.length() + 1 > this.limit) {
      throw new Error('Stack Overflow')
    }

    this.stack.push(value)
	logger.debug(`<<< Exiting push(value=${value})`);
  }

  /**
   * @function pop
   * @description - remove an element from the top
   * @throws will throw an error if the stack is empty
   * @return {T} removed element
   */
  pop(): T {
    if (this.length() !== 0) {
	logger.debug('>>> Entering pop()');
      return this.stack.pop() as T
    }

	logger.debug('<<< Exiting pop()');
    throw new Error('Stack Underflow')
  }

  /**
   * @function length
   * @description - number of elements in the stack
   * @return {number} the number of elements in the stack
   */
  length(): number {
	logger.debug('>>> Entering length()');
	logger.debug('<<< Exiting length()');
    return this.stack.length
  }

  /**
   * @function isEmpty
   * @description - check if the stack is empty
   * @return {boolean} returns true if the stack is empty, otherwise false
   */
  isEmpty(): boolean {
	logger.debug('>>> Entering isEmpty()');
	logger.debug('<<< Exiting isEmpty()');
    return this.length() === 0
  }

  /**
   * @function top
   * @description - return the last element in the stack without removing it
   * @return {T | null} return the last element or null if the stack is empty
   */
  top(): T | null {
    if (this.length() !== 0) {
	logger.debug('>>> Entering top()');
      return this.stack[this.length() - 1]
    }

	logger.debug('<<< Exiting top()');
    return null
  }
}
