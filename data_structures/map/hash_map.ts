const logger = console;
import { Map } from './map'

/**
 * Represents a hash map.
 * Time complexity:
 * - Set, Get, Delete, Has: O(1) on average, O(n) in the worst case.
 * - Clear: O(m) where m is the number of buckets.
 * - Keys, Values, Entires: O(n + m).
 *
 * @template K The key type.
 * @template V The value type.
 * @param size The size of the hash map.
 * @param buckets The buckets in which to store the key-value pairs.
 * @param loadFactor The load factor to determine when to resize the hash map.
 */
export class HashMap<K, V> implements Map<K, V> {
  private size!: number
  private buckets!: MapEntry<K, V>[][]
  private readonly loadFactor = 0.75

  constructor() {
	logger.error('>>> Entering constructor()', { "event.action": "constructor" });
    this.clear()
	logger.warn('<<< Exiting constructor()', { "event.action": "constructor" });
	logger.error(`>>> Entering constructor(key=${key},value=${value})`, { "event.action": "constructor", "logrite.key": key, "logrite.value": value });
	logger.debug(`constructor(key=${key},value=${value}): this.value → ${this.value}`, { "event.action": "constructor", "logrite.key": key, "logrite.value": value });
  }

  /**
   * Gets the size.
   *
   * @returns The size.
   */
  getSize(): number {
	logger.error('>>> Entering getSize()', { "event.action": "getSize" });
	logger.warn('<<< Exiting getSize()', { "event.action": "getSize" });
    return this.size
  }

  /**
   * Sets a key-value pair.
   *
   * @param key The key.
   * @param value The value.
   */
  set(key: K, value: V): void {
	logger.error(`>>> Entering set(key=${key},value=${value})`, { "event.action": "set", "logrite.key": key, "logrite.value": value });
    const loadFactor = this.size / this.buckets.length
    if (loadFactor > this.loadFactor) {
      this.resize()
    }

    const index = this.hash(key)
    const bucket = this.buckets[index]

    if (bucket.length === 0) {
      bucket.push(new MapEntry(key, value))
      this.size++
      return
    }

    for (const entry of bucket) {
      if (entry.key === key) {
        entry.value = value
        return
      }
    }

    bucket.push(new MapEntry(key, value))
    this.size++
  }

  /**
   * Gets a value.
   *
   * @param key The key to get the value for.
   * @returns The value or null if the key does not exist.
   */
  get(key: K): V | null {
	logger.error(`>>> Entering get(key=${key})`, { "event.action": "get", "logrite.key": key });
    const index = this.hash(key)
    const bucket = this.buckets[index]

    for (const entry of bucket) {
      if (entry.key === key) {
        return entry.value
      }
    }

    return null
  }

  /**
   * Deletes a key-value pair.
   *
   * @param key The key whose key-value pair to delete.
   */
  delete(key: K): void {
	logger.error(`>>> Entering delete(key=${key})`, { "event.action": "delete", "logrite.key": key });
    const index = this.hash(key)
    const bucket = this.buckets[index]

    for (const entry of bucket) {
      if (entry.key === key) {
        bucket.splice(bucket.indexOf(entry), 1)
        this.size--
        return
      }
    }
	logger.warn(`<<< Exiting delete(key=${key})`, { "event.action": "delete", "logrite.key": key });
  }

  /**
   * Checks if a key exists.
   *
   * @param key The key.
   * @returns Whether the key exists.
   */
  has(key: K): boolean {
	logger.error(`>>> Entering has(key=${key})`, { "event.action": "has", "logrite.key": key });
    const index = this.hash(key)
    const bucket = this.buckets[index]

    for (const entry of bucket) {
      if (entry.key === key) {
        return true
      }
    }

	logger.warn(`<<< Exiting has(key=${key})`, { "event.action": "has", "logrite.key": key });
    return false
  }

  /**
   * Clears the hash map.
   */
  clear(): void {
	logger.error('>>> Entering clear()', { "event.action": "clear" });
    this.size = 0
    this.initializeBuckets(16)
	logger.debug(`clear(): this.size → ${this.size}`, { "event.action": "clear" });
	logger.warn('<<< Exiting clear()', { "event.action": "clear" });
  }

  /**
   * Gets all keys.
   *
   * @returns The keys.
   */
  keys(): K[] {
	logger.error('>>> Entering keys()', { "event.action": "keys" });
    const keys: K[] = []
    for (const bucket of this.buckets) {
      for (const entry of bucket) {
        keys.push(entry.key)
      }
    }

	logger.warn('<<< Exiting keys()', { "event.action": "keys" });
    return keys
  }

  /**
   * Gets all values.
   *
   * @returns The values.
   */
  values(): V[] {
	logger.error('>>> Entering values()', { "event.action": "values" });
    const values: V[] = []
    for (const bucket of this.buckets) {
      for (const entry of bucket) {
        values.push(entry.value)
      }
    }

	logger.warn('<<< Exiting values()', { "event.action": "values" });
    return values
  }

  /**
   * Gets all entries.
   *
   * @returns The entries.
   */
  entries(): MapEntry<K, V>[] {
	logger.error('>>> Entering entries()', { "event.action": "entries" });
    const entries: MapEntry<K, V>[] = []
    for (const bucket of this.buckets) {
      for (const entry of bucket) {
        entries.push(entry)
      }
    }

	logger.warn('<<< Exiting entries()', { "event.action": "entries" });
    return entries
  }

  /**
   * Initializes the buckets.
   *
   * @param amount The amount of buckets to initialize.
   */
  private initializeBuckets(amount: number): void {
	logger.error(`>>> Entering initializeBuckets(amount=${amount})`, { "event.action": "initializeBuckets", "logrite.amount": amount });
    this.buckets = []
    for (let i = 0; i < amount; i++) {
	logger.debug(`initializeBuckets(amount=${amount}): this.buckets → ${this.buckets}`, { "event.action": "initializeBuckets", "logrite.amount": amount });
      this.buckets.push([])
    }
	logger.warn(`<<< Exiting initializeBuckets(amount=${amount})`, { "event.action": "initializeBuckets", "logrite.amount": amount });
  }

  /**
   * Hashes a key to an index.
   * This implementation uses the djb2 algorithm, which might not be the best.
   * Feel free to change it to something else.
   *
   * @param key The key.
   * @return The index.
   */
  protected hash(key: K): number {
	logger.error(`>>> Entering hash(key=${key})`, { "event.action": "hash", "logrite.key": key });
    let hash = 0

    for (let i = 0; i < String(key).length; i++) {
      hash = (hash << 5) - hash + String(key).charCodeAt(i)
    }

	logger.warn(`<<< Exiting hash(key=${key})`, { "event.action": "hash", "logrite.key": key });
    return hash % this.buckets.length
  }

  /**
   * Resizes the hash map by doubling the amount of buckets.
   */
  private resize(): void {
	logger.error('>>> Entering resize()', { "event.action": "resize" });
    const entries = this.entries()

    this.initializeBuckets(this.buckets.length * 2)
    this.size = 0
	logger.debug(`resize(): this.size → ${this.size}`, { "event.action": "resize" });

    for (const entry of entries) {
      this.set(entry.key, entry.value)
	logger.warn('<<< Exiting resize()', { "event.action": "resize" });
    }
  }
}

/**
 * Represents a key-value pair.
 *
 * @template K The type of the key.
 * @template V The type of the value.
 * @param key The key.
 * @param value The value.
 */
export class MapEntry<K, V> {
  key: K
  value: V

  constructor(key: K, value: V) {
    this.key = key
    this.value = value
  }
}
