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

  addItem(item: IAnnouncement): Promise<IAnnouncement> {
    return new Promise((resolve) => {
      this.storage.push(item);
      resolve(item);
    });
  }

  deleteItem(id: string): Promise<IAnnouncement[]> {
    this.storage = this.storage.filter((item) => item.id !== id);
    const resultPromise = new Promise<IAnnouncement[]>((resolve) => {
      resolve(this.storage);
    });
    return resultPromise;
  }

  getItems(): Promise<IAnnouncement[]> {
    return new Promise<IAnnouncement[]>((resolve) => {
      resolve(this.storage);
    });
  }

  reset(): void {
    this.storage = [];
  }
}
