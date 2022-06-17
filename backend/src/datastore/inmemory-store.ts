import { IAnnouncement } from '../models/announcement';

export class InmemoryStore {
  private static dataStore: InmemoryStore;

  private storage: IAnnouncement[] = [];

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  public static getInstance(): InmemoryStore {
    if (this.dataStore == null) {
      this.dataStore = new InmemoryStore();
    }
    return this.dataStore;
  }

  addItem(item: IAnnouncement): void {
    this.storage.push(item);
  }

  deleteItem(id: string): IAnnouncement[] {
    this.storage = this.storage.filter((item) => item.id !== id);
    return this.storage;
  }

  getItems(): IAnnouncement[] {
    return this.storage;
  }
}
