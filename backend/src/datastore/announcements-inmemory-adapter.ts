import { InmemoryStore } from './inmemory-store';
import { IAnnouncement } from '../models/announcement';
import { v4 as uuidv4 } from 'uuid';
import { StorageAdapter } from './storage-adapter';

export class AnnouncementsInmemoryAdapter
  implements StorageAdapter<IAnnouncement> {
  store: InmemoryStore;

  constructor() {
    this.store = InmemoryStore.getInstance();
  }

  addItem(newAnnouncement: IAnnouncement): Promise<IAnnouncement> {
    newAnnouncement.id = uuidv4();
    if (typeof newAnnouncement.createdOn === 'undefined') {
      newAnnouncement.createdOn = new Date();
    }
    return this.store.addItem(newAnnouncement);
  }

  getItems(): Promise<IAnnouncement[]> {
    return this.store.getItems();
  }

  deleteItem(id: string): Promise<IAnnouncement[]> {
    return this.store.deleteItem(id);
  }

  resetStorage(): void {
    this.store.reset();
  }
}
