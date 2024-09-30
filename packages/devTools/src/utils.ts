
export class WeakObjectMap<T extends object> {
    private map: Map<string, WeakRef<T>>;
    private finalizationRegistry: FinalizationRegistry<string>;
  
    constructor() {
      this.map = new Map();
      this.finalizationRegistry = new FinalizationRegistry((key) => {
        this.map.delete(key);
      });
    }
  
    set(key: string, value: T): void {
      const weakRef = new WeakRef(value);
      this.map.set(key, weakRef);
      this.finalizationRegistry.register(value, key);
    }
  
    get(key: string): T | undefined {
      const weakRef = this.map.get(key);
      return weakRef ? weakRef.deref() : undefined;
    }
  
    delete(key: string): boolean {
      return this.map.delete(key);
    }
  
    has(key: string): boolean {
      const weakRef = this.map.get(key);
      return weakRef ? weakRef.deref() !== undefined : false;
    }
}

new WeakObjectMap()   