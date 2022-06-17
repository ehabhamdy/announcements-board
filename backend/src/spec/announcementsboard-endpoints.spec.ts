import Server from '../server/server';
import request from 'supertest';
import { IAnnouncement } from '../models/announcement';

describe('Testing announcements route endpoints', function () {
  it('Create a test announcement', async function () {
    Server.bootstrap().then((server: Server) => {
      const app = server.getExpressApplication();
      const storage = server.getAppStorage();
      storage.resetStorage();
      const payload = { content: 'Test Announcement' };
      request(app)
        .post('/api/v1/announcements')
        .send(payload)
        .expect(201)
        .then((response) => {
          const announcement: IAnnouncement = response.body.announcement;
          expect(response.body.message).toMatch('succeeded');
          expect(announcement.content).toMatch(payload.content);
          expect(announcement.id).toBeDefined();
          expect(announcement.createdOn).toBeDefined();
        });
    });
  });

  it('get all saved announcements', async function () {
    Server.bootstrap().then((server: Server) => {
      const app = server.getExpressApplication();
      const storage = server.getAppStorage();
      storage.resetStorage();
      const payload: any = {
        content: 'Test Announcement',
      };
      storage.addItem(payload);
      request(app)
        .get('/api/v1/announcements')
        .expect(200)
        .then((response) => {
          expect(response.body.message).toMatch('succeeded');
          expect(response.body.announcements.length).toEqual(1);
          expect(response.body.announcements[0].content).toMatch(
            payload.content
          );
          expect(response.body.announcements[0].createdOn).toBeDefined();
        });
    });
  });

  it('Delete an announcement', async function () {
    Server.bootstrap().then((server: Server) => {
      const app = server.getExpressApplication();
      const storage = server.getAppStorage();
      storage.resetStorage();
      const payload: any = {
        content: 'Test Announcement',
      };
      const newItem = storage.addItem(payload);
      request(app)
        .delete(`/api/v1/announcements/${newItem.id}`)
        .expect(202)
        .then((response) => {
          expect(response.body.message).toMatch('succeeded');
          expect(response.body.announcements.length).toEqual(0);
        });
    });
  });
});
