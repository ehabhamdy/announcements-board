import { Injectable } from '@angular/core';
import {IAnnouncement} from "../models/announcement";
import {Observable, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {FilterType} from "../components/main-announcements-board/announcements-board.component";

@Injectable({
  providedIn: 'root'
})
export class AnnouncementsService {
  announcements: IAnnouncement[] = []
  private announcementUpdate = new Subject<IAnnouncement[]>()

  constructor(private http: HttpClient) { }


  getAnnouncementUpdateObserver() {
    return this.announcementUpdate.asObservable();
  }

  getAnnouncements() {
    this.http.get<{message: string, announcements: IAnnouncement[]}>('http://localhost:3000/api/v1/announcements')
      .subscribe((response) => {
        this.announcements = response.announcements;
        this.announcementUpdate.next([...this.announcements])
      });
  }

  getAnnouncementsForPeriod(period: FilterType) {
    console.log(period)
    this.http.get<{message: string, announcements: IAnnouncement[]}>(`http://localhost:3000/api/v1/announcements/${period}`)
      .subscribe((response) => {
        this.announcements = response.announcements;
        this.announcementUpdate.next([...this.announcements])
      });
  }

  createAnnouncement(announcement: Partial<IAnnouncement>) {
    if (announcement.content) {
      this.http.post<{messsage: string, announcement: IAnnouncement}>('http://localhost:3000/api/v1/announcements', announcement)
        .subscribe((response) => {
          this.announcements.push(response.announcement)
          this.announcementUpdate.next([...this.announcements])
        });
    }
  }

  deleteAnnouncement(announcementId: string) {
    console.log(announcementId);
    this.http.delete<{message: string, announcements: IAnnouncement[]}>(`http://localhost:3000/api/v1/announcements/${announcementId}`)
      .subscribe((response) => {
        console.log(response);
        this.announcements = response.announcements;
        this.announcementUpdate.next([...this.announcements])
      })
  }
}
