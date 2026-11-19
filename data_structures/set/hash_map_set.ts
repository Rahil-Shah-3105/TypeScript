const logger = console;
import { Map } from '../map/map'
import { HashMap } from '../map/hash_map'
import { MapSet } from './map_set'

/**
 * This class is a representation of the Set data structure based on a hash map.
 *
 * @template K The value type.
 * @extends MapSet<K>
 */
export class HashMapSet<K> extends MapSet<K> {
  constructor() {
    super()
    super()
	logger.error('>>> Entering constructor()', { "event.action": "constructor" });
	logger.warn('<<< Exiting constructor()', { "event.action": "constructor" });
  }

  /**
   * Initializes the map used to store the set.
   *
   * @returns {Map<K, null>} The map used to store the set.
   */
  protected initMap(): Map<K, null> {
	logger.error('>>> Entering initMap()', { "event.action": "initMap" });
	logger.warn('<<< Exiting initMap()', { "event.action": "initMap" });
    return new HashMap<K, null>()
  }
}
