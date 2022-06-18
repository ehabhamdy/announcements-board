import Server from '../server/server';
import request from 'supertest';
import { IAnnouncement } from '../models/announcement';
import { FilterType } from '../routes/utilities/filter.type';
import { FilterMap } from '../routes/utilities/filter.map';

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

  it('Get announcements posted during the last week', async function () {
    Server.bootstrap().then((server: Server) => {
      const app = server.getExpressApplication();
      const storage = server.getAppStorage();
      storage.resetStorage();
      const now = new Date();
      const oldDate = new Date();
      oldDate.setDate(now.getDate() - FilterMap[FilterType.Month]);
      const oldAnnouncement: any = {
        content: 'Old Announcement',
        createdOn: oldDate,
      };
      storage.addItem(oldAnnouncement);
      const newAnnouncement: any = {
        content: 'New Announcement',
        createdOn: now,
      };
      storage.addItem(newAnnouncement);

      const filter = FilterType.Week;
      request(app)
        .get(`/api/v1/announcements/${filter}`)
        .expect(200)
        .then((response) => {
          console.log(response);
          expect(response.body.message).toMatch('succeeded');
          expect(response.body.announcements.length).toEqual(1);
          expect(response.body.announcements[0].content).toMatch(
            newAnnouncement.content
          );
          expect(response.body.announcements[0].createdOn).toBeDefined();
        });
    });
  });
});
