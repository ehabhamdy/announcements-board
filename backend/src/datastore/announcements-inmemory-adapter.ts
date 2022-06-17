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

  addItem(newAnnouncement: IAnnouncement): IAnnouncement {
    newAnnouncement.id = uuidv4();
    newAnnouncement.createdOn = new Date();
    this.store.addItem(newAnnouncement);
    return newAnnouncement;
  }

  getItems(): IAnnouncement[] {
    return this.store.getItems();
  }

  deleteItem(id: string): IAnnouncement[] {
    return this.store.deleteItem(id);
  }
}
