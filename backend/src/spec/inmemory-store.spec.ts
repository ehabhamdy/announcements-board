import { InmemoryStore } from '../datastore/inmemory-store';
import { v4 as uuidv4 } from 'uuid';
import { IAnnouncement } from '../models/announcement';

describe('Testing in memory storage option', function () {
  it('Add item to storage', async () => {
    const newAnnouncement: IAnnouncement = {
      content: 'Test',
      id: uuidv4(),
      createdOn: new Date(),
    };
    InmemoryStore.getInstance().reset();
    await InmemoryStore.getInstance().addItem(newAnnouncement);
    const response = await InmemoryStore.getInstance().getItems();
    expect(response[0].content).toMatch('Test');
  });
});
