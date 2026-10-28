import {
  CacheEngine,
  CacheEntry,
  CacheOperationResult,
} from "@/types/simulations";

export class LRUCacheEngine implements CacheEngine {
  private capacity: number;
  private entries: Map<string, CacheEntry>;

  constructor(capacity: number = 4) {
    this.capacity = capacity;
    this.entries = new Map();
  }

  public setCapacity(capacity: number): void {
    this.capacity = capacity;
    while (this.entries.size > this.capacity) {
      this.evictLeastRecent();
    }
  }

  public getCapacity(): number {
    return this.capacity;
  }

  public getEntries(): CacheEntry[] {
    return Array.from(this.entries.values());
  }

  public clear(): void {
    this.entries.clear();
  }

  private evictLeastRecent(): CacheEntry | undefined {
    let oldestKey: string | null = null;
    let oldestTime = Infinity;

    for (const [key, entry] of this.entries.entries()) {
      if (entry.lastAccessed < oldestTime) {
        oldestTime = entry.lastAccessed;
        oldestKey = key;
      }
    }

    if (oldestKey) {
      const evicted = this.entries.get(oldestKey);
      this.entries.delete(oldestKey);
      return evicted;
    }
    return undefined;
  }

  public get(key: string): CacheOperationResult {
    const entry = this.entries.get(key);
    const now = Date.now();

    if (entry) {
      entry.lastAccessed = now;
      entry.frequency += 1;
      return {
        operation: "GET",
        key,
        status: "HIT",
        entries: this.getEntries(),
        timestamp: now,
      };
    }

    return {
      operation: "GET",
      key,
      status: "MISS",
      entries: this.getEntries(),
      timestamp: now,
    };
  }

  public put(key: string, value: string): CacheOperationResult {
    const now = Date.now();
    let evictedEntry: CacheEntry | undefined = undefined;

    if (this.entries.has(key)) {
      const entry = this.entries.get(key)!;
      entry.value = value;
      entry.lastAccessed = now;
      entry.frequency += 1;
      return {
        operation: "PUT",
        key,
        status: "HIT",
        entries: this.getEntries(),
        timestamp: now,
      };
    }

    // New key insertion: check capacity for eviction
    if (this.entries.size >= this.capacity) {
      evictedEntry = this.evictLeastRecent();
    }

    const newEntry: CacheEntry = {
      key,
      value,
      frequency: 1,
      lastAccessed: now,
    };

    this.entries.set(key, newEntry);

    return {
      operation: "PUT",
      key,
      status: "MISS",
      evictedEntry,
      entries: this.getEntries(),
      timestamp: now,
    };
  }
}

export class LFUCacheEngine implements CacheEngine {
  private capacity: number;
  private entries: Map<string, CacheEntry>;

  constructor(capacity: number = 4) {
    this.capacity = capacity;
    this.entries = new Map();
  }

  public setCapacity(capacity: number): void {
    this.capacity = capacity;
    while (this.entries.size > this.capacity) {
      this.evictLeastFrequent();
    }
  }

  public getCapacity(): number {
    return this.capacity;
  }

  public getEntries(): CacheEntry[] {
    return Array.from(this.entries.values());
  }

  public clear(): void {
    this.entries.clear();
  }

  private evictLeastFrequent(): CacheEntry | undefined {
    let candidateKey: string | null = null;
    let minFrequency = Infinity;
    let oldestTime = Infinity;

    for (const [key, entry] of this.entries.entries()) {
      if (entry.frequency < minFrequency) {
        minFrequency = entry.frequency;
        oldestTime = entry.lastAccessed;
        candidateKey = key;
      } else if (entry.frequency === minFrequency && entry.lastAccessed < oldestTime) {
        oldestTime = entry.lastAccessed;
        candidateKey = key;
      }
    }

    if (candidateKey) {
      const evicted = this.entries.get(candidateKey);
      this.entries.delete(candidateKey);
      return evicted;
    }
    return undefined;
  }

  public get(key: string): CacheOperationResult {
    const entry = this.entries.get(key);
    const now = Date.now();

    if (entry) {
      entry.lastAccessed = now;
      entry.frequency += 1;
      return {
        operation: "GET",
        key,
        status: "HIT",
        entries: this.getEntries(),
        timestamp: now,
      };
    }

    return {
      operation: "GET",
      key,
      status: "MISS",
      entries: this.getEntries(),
      timestamp: now,
    };
  }

  public put(key: string, value: string): CacheOperationResult {
    const now = Date.now();
    let evictedEntry: CacheEntry | undefined = undefined;

    if (this.entries.has(key)) {
      const entry = this.entries.get(key)!;
      entry.value = value;
      entry.lastAccessed = now;
      entry.frequency += 1;
      return {
        operation: "PUT",
        key,
        status: "HIT",
        entries: this.getEntries(),
        timestamp: now,
      };
    }

    if (this.entries.size >= this.capacity) {
      evictedEntry = this.evictLeastFrequent();
    }

    const newEntry: CacheEntry = {
      key,
      value,
      frequency: 1,
      lastAccessed: now,
    };

    this.entries.set(key, newEntry);

    return {
      operation: "PUT",
      key,
      status: "MISS",
      evictedEntry,
      entries: this.getEntries(),
      timestamp: now,
    };
  }
}

