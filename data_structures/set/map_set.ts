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
	logger.error('>>> Entering constructor()', { "event.action": "constructor" });
    this.map = this.initMap()
	logger.warn('<<< Exiting constructor()', { "event.action": "constructor" });
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
	logger.error(`>>> Entering add(value=${value})`, { "event.action": "add", "logrite.value": value });
    this.map.set(value, null)
	logger.warn(`<<< Exiting add(value=${value})`, { "event.action": "add", "logrite.value": value });
  }

  /**
   * Removes an element from the set.
   *
   * @param value The value to remove from the set.
   */
  delete(value: K): void {
	logger.error(`>>> Entering delete(value=${value})`, { "event.action": "delete", "logrite.value": value });
    this.map.delete(value)
	logger.warn(`<<< Exiting delete(value=${value})`, { "event.action": "delete", "logrite.value": value });
  }

  /**
   * Checks if the set contains a given value.
   *
   * @param value The value to check for.
   * @returns Whether the set contains the value.
   */
  has(value: K): boolean {
	logger.error(`>>> Entering has(value=${value})`, { "event.action": "has", "logrite.value": value });
	logger.warn(`<<< Exiting has(value=${value})`, { "event.action": "has", "logrite.value": value });
    return this.map.has(value)
  }

  /**
   * Removes all elements from the set.
   */
  clear(): void {
	logger.error('>>> Entering clear()', { "event.action": "clear" });
    this.map.clear()
	logger.warn('<<< Exiting clear()', { "event.action": "clear" });
  }

  /**
   * Returns an array of all the values in the set.
   *
   * @returns An array of all the values in the set.
   */
  values(): K[] {
	logger.error('>>> Entering values()', { "event.action": "values" });
	logger.warn('<<< Exiting values()', { "event.action": "values" });
    return this.map.keys()
  }

  /**
   * Returns the number of elements in the set.
   *
   * @returns The number of elements in the set.
   */
  getSize(): number {
	logger.error('>>> Entering getSize()', { "event.action": "getSize" });
	logger.warn('<<< Exiting getSize()', { "event.action": "getSize" });
    return this.map.getSize()
  }
}
