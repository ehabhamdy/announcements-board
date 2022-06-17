import express, { Request, Response, Router } from 'express';
import { IAnnouncement } from '../models/announcement';
import { AnnouncementsInmemoryAdapter } from '../datastore/announcements-inmemory-adapter';
import { StorageAdapter } from '../datastore/storage-adapter';

const storageAdapter: StorageAdapter<IAnnouncement> = new AnnouncementsInmemoryAdapter();

const FilterMap = {
  All: 'All',
  Week: 7,
  Month: 30,
  Today: 0,
};

const router: Router = express.Router();

router.get('/', (_req: Request, res: Response) => {
  res.status(200).send({
    message: 'succeeded',
    announcements: storageAdapter.getItems(),
  });
});

router.get('/:filter', (req: Request, res: Response) => {
  const now = new Date();
  type ObjectKey = keyof typeof FilterMap;
  const filterType = req.params.filter as ObjectKey;
  let filteredAnnouncements;
  if (filterType == 'All') {
    filteredAnnouncements = storageAdapter.getItems();
  } else {
    const startingDate: Date = new Date();
    startingDate.setDate(now.getDate() - FilterMap[filterType]);
    startingDate.setHours(0, 0, 0, 0);

    filteredAnnouncements = storageAdapter
      .getItems()
      .filter((item) => item.createdOn > startingDate);
  }
  res.status(200).send({
    message: 'succeeded',
    announcements: filteredAnnouncements,
  });
});

router.post('/', (req: Request, res: Response) => {
  const newAnnouncement: IAnnouncement = storageAdapter.addItem(req.body);

  res.status(201).send({ message: 'succeeded', announcement: newAnnouncement });
});

router.delete('/:id', (req: Request, res: Response) => {
  res.status(202).send({
    message: 'succeeded',
    announcements: storageAdapter.deleteItem(req.params.id),
  });
});

export default router;
