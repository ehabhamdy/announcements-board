import express, { Request, Response, Router } from 'express';
import path from 'path';

const router: Router = express.Router();

router.use(express.static(path.join(__dirname, '../client/build')));

// Application routing
router.get('/', (_req: Request, res: Response) => {
  console.log('something', __dirname);
  res.sendFile(path.join(__dirname + '../client/build/index.html'));
});

export default router;
