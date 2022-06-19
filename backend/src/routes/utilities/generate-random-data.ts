import { StorageAdapter } from '../../datastore/storage-adapter';
import { IAnnouncement } from '../../models/announcement';
import * as data from '../../datastore/data.json';

export async function generateRandomData(
  adapter: StorageAdapter<IAnnouncement>
) {
  for (const item of data.announcements) {
    const date = new Date();
    date.setDate(new Date().getDate() - Math.floor(Math.random() * 40) + 1);
    const announcement: any = {
      content: item.content,
      createdOn: date,
    };
    if (item.content.includes('enjoy')) {
      announcement.createdOn = new Date();
    }
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    adapter.addItem(announcement).then(() => {});
    (await adapter.getItems()).sort((a, b) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return new Date(a.createdOn) - new Date(b.createdOn);
    });
  }
}
