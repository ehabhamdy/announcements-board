export abstract class StorageAdapter<T> {
  abstract addItem(item: T): T;
  abstract getItems(): T[];
  abstract deleteItem(id: string): T[];
}
