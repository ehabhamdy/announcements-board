import express, { Request, Response, Router } from 'express';
import { InmemoryStore } from '../datastore/inmemory-store';
import { v4 as uuidv4 } from 'uuid';
import { IAnnouncement } from '../models/announcement';

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
    announcements: InmemoryStore.getInstance().getItems(),
  });
});

router.get('/:filter', (req: Request, res: Response) => {
  const now = new Date();
  type ObjectKey = keyof typeof FilterMap;
  const filterType = req.params.filter as ObjectKey;
  let filteredAnnouncements;
  if (filterType == 'All') {
    filteredAnnouncements = InmemoryStore.getInstance().getItems();
  } else {
    const startingDate: Date = new Date();
    startingDate.setDate(now.getDate() - FilterMap[filterType]);
    startingDate.setHours(0, 0, 0, 0);

    filteredAnnouncements = InmemoryStore.getInstance()
      .getItems()
      .filter((item) => item.createdOn > startingDate);
  }

  console.log(filteredAnnouncements);

  res.status(200).send({
    message: 'succeeded',
    announcements: filteredAnnouncements,
  });
});

router.post('/', (req: Request, res: Response) => {
  const newAnnouncement: IAnnouncement = req.body;
  newAnnouncement.id = uuidv4();
  newAnnouncement.createdOn = new Date();
  InmemoryStore.getInstance().addItem(newAnnouncement);
  res.status(201).send({ message: 'succeeded', announcement: newAnnouncement });
});

router.delete('/:id', (req: Request, res: Response) => {
  res.status(202).send({
    message: 'succeeded',
    announcements: InmemoryStore.getInstance().deleteItem(req.params.id),
  });
});

export default router;
