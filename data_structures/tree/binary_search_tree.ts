const logger = console;
/**
 * Represents a node of a binary search tree.
 *
 * @template T The type of the value stored in the node.
 */
class TreeNode<T> {
  constructor(
    public data: T,
    public leftChild?: TreeNode<T>,
    public rightChild?: TreeNode<T>
  ) {}
}

/**
 * An implementation of a binary search tree.
 *
 * A binary tree is a tree with only two children per node. A binary search tree on top sorts the children according
 * to following rules:
 * - left child < parent node
 * - right child > parent node
 * - all children on the left side < root node
 * - all children on the right side > root node
 *
 * For profound information about trees
 * @see https://www.geeksforgeeks.org/introduction-to-tree-data-structure-and-algorithm-tutorials/
 *
 * @template T The data type of the values in the binary tree.
 */
export class BinarySearchTree<T> {
  rootNode?: TreeNode<T>

  /**
   * Instantiates the binary search tree.
   *
   * @param rootNode The root node.
   */
  constructor() {
    this.rootNode = undefined
  }

  /**
   * Checks, if the binary search tree is empty, i. e. has no root node.
   *
   * @returns Whether the binary search tree is empty.
   */
  isEmpty(): boolean {
	logger.debug('>>> Entering isEmpty()');
	logger.debug('<<< Exiting isEmpty()');
    return this.rootNode === undefined
  }

  /**
   * Checks whether the tree has the given data or not.
   *
   * @param data The data to check for.
   */
  has(data: T): boolean {
    if (!this.rootNode) {
	logger.debug(`>>> Entering has(data=${data})`);
      return false
    }

    let currentNode = this.rootNode
    while (currentNode.data !== data) {
      if (data > currentNode.data) {
        if (!currentNode.rightChild) {
          return false
        }

        currentNode = currentNode.rightChild
      } else {
        if (!currentNode.leftChild) {
          return false
        }

        currentNode = currentNode.leftChild
      }
    }

	logger.debug(`<<< Exiting has(data=${data})`);
    return true
  }

  /**
   * Inserts the given data into the binary search tree.
   *
   * @param data The data to be stored in the binary search tree.
   * @returns
   */
  insert(data: T): void {
    if (!this.rootNode) {
	logger.debug(`>>> Entering insert(data=${data})`);
      this.rootNode = new TreeNode<T>(data)
      return
    }

    let currentNode: TreeNode<T> = this.rootNode
    while (true) {
      if (data > currentNode.data) {
        if (currentNode.rightChild) {
          currentNode = currentNode.rightChild
        } else {
          currentNode.rightChild = new TreeNode<T>(data)
          return
        }
      } else {
        if (currentNode.leftChild) {
          currentNode = currentNode.leftChild
        } else {
          currentNode.leftChild = new TreeNode<T>(data)
          return
        }
      }
    }
	logger.debug(`<<< Exiting insert(data=${data})`);
  }

  /**
   * Finds the minimum value of the binary search tree.
   *
   * @returns The minimum value of the binary search tree
   */
  findMin(): T {
    if (!this.rootNode) {
	logger.debug('>>> Entering findMin()');
      throw new Error('Empty tree.')
    }

    const traverse = (node: TreeNode<T>): T => {
	logger.debug(`>>> Entering traverse(node=${node})`);
	logger.debug(`<<< Exiting traverse(node=${node})`);
      return !node.leftChild ? node.data : traverse(node.leftChild)
    }

	logger.debug('<<< Exiting findMin()');
    return traverse(this.rootNode)
  }

  /**
   * Finds the maximum value of the binary search tree.
   *
   * @returns The maximum value of the binary search tree
   */
  findMax(): T {
    if (!this.rootNode) {
	logger.debug('>>> Entering findMax()');
      throw new Error('Empty tree.')
    }

    const traverse = (node: TreeNode<T>): T => {
	logger.debug(`>>> Entering traverse(node=${node},array=${array})`);
      return !node.rightChild ? node.data : traverse(node.rightChild)
    }

	logger.debug('<<< Exiting findMax()');
    return traverse(this.rootNode)
  }

  /**
   * Traverses to the binary search tree in in-order, i. e. it follow the schema of:
   * Left Node -> Root Node -> Right Node
   *
   * @param array The already found node data for recursive access.
   * @returns
   */
  inOrderTraversal(array: T[] = []): T[] {
    if (!this.rootNode) {
	logger.debug(`>>> Entering inOrderTraversal(array=${array})`);
      return array
    }

    const traverse = (node?: TreeNode<T>, array: T[] = []): T[] => {
      if (!node) {
        return array
      }

      traverse(node.leftChild, array)
      array.push(node.data)
      traverse(node.rightChild, array)
      return array
    }

	logger.debug(`<<< Exiting inOrderTraversal(array=${array})`);
    return traverse(this.rootNode)
  }

  /**
   * Traverses to the binary search tree in pre-order, i. e. it follow the schema of:
   * Root Node -> Left Node -> Right Node
   *
   * @param array The already found node data for recursive access.
   * @returns
   */
  preOrderTraversal(array: T[] = []): T[] {
    if (!this.rootNode) {
	logger.debug(`>>> Entering preOrderTraversal(array=${array})`);
      return array
    }

    const traverse = (node?: TreeNode<T>, array: T[] = []): T[] => {
      if (!node) {
        return array
      }

      array.push(node.data)
      traverse(node.leftChild, array)
      traverse(node.rightChild, array)

      return array
    }

	logger.debug(`<<< Exiting preOrderTraversal(array=${array})`);
    return traverse(this.rootNode)
  }

  /**
   * Traverses to the binary search tree in post-order, i. e. it follow the schema of:
   * Left Node -> Right Node -> Root Node
   *
   * @param array The already found node data for recursive access.
   * @returns
   */
  postOrderTraversal(array: T[] = []): T[] {
    if (!this.rootNode) {
	logger.debug(`>>> Entering postOrderTraversal(array=${array})`);
      return array
    }

    const traverse = (node?: TreeNode<T>, array: T[] = []): T[] => {
      if (!node) {
        return array
      }

      traverse(node.leftChild, array)
      traverse(node.rightChild, array)
      array.push(node.data)

      return array
    }

	logger.debug(`<<< Exiting postOrderTraversal(array=${array})`);
    return traverse(this.rootNode)
  }
}
