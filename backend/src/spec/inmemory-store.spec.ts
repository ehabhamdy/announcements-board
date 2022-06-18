import { InmemoryStore } from '../datastore/inmemory-store';
import { v4 as uuidv4 } from 'uuid';
import { IAnnouncement } from '../models/announcement';

describe('Testing in memory storage option', function () {
  it('Add item to storage', () => {
    const newAnnouncement: IAnnouncement = {
      content: 'Test',
      id: uuidv4(),
      createdOn: new Date(),
    };
    InmemoryStore.getInstance().addItem(newAnnouncement);
    expect(InmemoryStore.getInstance().getItems()[0].content).toMatch('Test');
  });
});
