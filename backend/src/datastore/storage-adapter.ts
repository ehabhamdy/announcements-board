export abstract class StorageAdapter<T> {
  abstract addItem(item: T): Promise<T>;
  abstract getItems(): Promise<T[]>;
  abstract deleteItem(id: string): Promise<T[]>;
}
