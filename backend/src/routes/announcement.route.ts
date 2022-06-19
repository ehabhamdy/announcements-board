import express, { Request, Response, Router } from 'express';
import { IAnnouncement } from '../models/announcement';
import { AnnouncementsInmemoryAdapter } from '../datastore/announcements-inmemory-adapter';
import { StorageAdapter } from '../datastore/storage-adapter';
import { FilterMap } from './utilities/filter.map';
import { generateRandomData } from './utilities/generate-random-data';

const storageAdapter: StorageAdapter<IAnnouncement> = new AnnouncementsInmemoryAdapter();

/* Inserting some initial data */
generateRandomData(storageAdapter).then(() =>
  console.log('Random data generated')
);

const router: Router = express.Router();

router.get('/', async (_req: Request, res: Response) => {
  const response = await storageAdapter.getItems();
  res.status(200).send({
    message: 'succeeded',
    announcements: [...response].reverse(),
  });
});

router.get('/:filter', async (req: Request, res: Response) => {
  const now = new Date();
  type ObjectKey = keyof typeof FilterMap;
  const filterType = req.params.filter as ObjectKey;
  let filteredAnnouncements;
  const allAnnouncements = await storageAdapter.getItems();
  if (filterType == 'All') {
    filteredAnnouncements = allAnnouncements;
  } else {
    const startingDate: Date = new Date();
    startingDate.setDate(now.getDate() - FilterMap[filterType]);
    startingDate.setHours(0, 0, 0, 0);

    filteredAnnouncements = allAnnouncements.filter(
      (item) => item.createdOn > startingDate
    );
  }
  res.status(200).send({
    message: 'succeeded',
    announcements: [...filteredAnnouncements].reverse(),
  });
});

router.post('/', async (req: Request, res: Response) => {
  const newAnnouncement: IAnnouncement = await storageAdapter.addItem(req.body);

  res.status(201).send({ message: 'succeeded', announcement: newAnnouncement });
});

router.delete('/:id', (req: Request, res: Response) => {
  storageAdapter.deleteItem(req.params.id).then((response) => {
    res.status(202).send({
      message: 'succeeded',
      announcements: [...response].reverse(),
    });
  });
});

export default router;
