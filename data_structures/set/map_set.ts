const logger = console;
import { Map } from './map'
import { Set } from './set'

/**
 * This class is a representation of the Set data structure based on a hash map.
 *
 * @template K The value type.
 * @implements Set<K>
 * @property {Map<K, null>} map The map used to store the set.
 */
export abstract class MapSet<K> implements Set<K> {
  private map: Map<K, null>

  constructor() {
	logger.debug('>>> Entering constructor()');
    this.map = this.initMap()
	logger.debug('<<< Exiting constructor()');
  }

  /**
   * Initializes the map used to store the set.
   */
  protected abstract initMap(): Map<K, null>

  /**
   * Adds a new element to the set.
   *
   * @param value The value to add to the set.
   */
  add(value: K): void {
	logger.debug(`>>> Entering add(value=${value})`);
    this.map.set(value, null)
	logger.debug(`<<< Exiting add(value=${value})`);
  }

  /**
   * Removes an element from the set.
   *
   * @param value The value to remove from the set.
   */
  delete(value: K): void {
	logger.debug(`>>> Entering delete(value=${value})`);
    this.map.delete(value)
	logger.debug(`<<< Exiting delete(value=${value})`);
  }

  /**
   * Checks if the set contains a given value.
   *
   * @param value The value to check for.
   * @returns Whether the set contains the value.
   */
  has(value: K): boolean {
	logger.debug(`>>> Entering has(value=${value})`);
	logger.debug(`<<< Exiting has(value=${value})`);
    return this.map.has(value)
  }

  /**
   * Removes all elements from the set.
   */
  clear(): void {
	logger.debug('>>> Entering clear()');
    this.map.clear()
	logger.debug('<<< Exiting clear()');
  }

  /**
   * Returns an array of all the values in the set.
   *
   * @returns An array of all the values in the set.
   */
  values(): K[] {
	logger.debug('>>> Entering values()');
	logger.debug('<<< Exiting values()');
    return this.map.keys()
  }

  /**
   * Returns the number of elements in the set.
   *
   * @returns The number of elements in the set.
   */
  getSize(): number {
	logger.debug('>>> Entering getSize()');
	logger.debug('<<< Exiting getSize()');
    return this.map.getSize()
  }
}
