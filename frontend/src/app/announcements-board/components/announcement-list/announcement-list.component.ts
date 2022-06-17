import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {IAnnouncement} from "../../models/announcement";
import {AnnouncementsService} from "../../services/announcements.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-announcement-list',
  templateUrl: './announcement-list.component.html',
  styleUrls: ['./announcement-list.component.scss']
})
export class AnnouncementListComponent implements OnInit, OnDestroy {
  // announcements: IAnnouncement[] =
  // [
  //     { content: "This is the first announcement",  createdOn: new Date},
  //     { content: "This is the second announcement", createdOn: new Date }
  //   ];
  announcements: IAnnouncement[] = [];
  annouuncementSubscription: Subscription | undefined;

  constructor(private announcementsService: AnnouncementsService) {
  }

  ngOnInit(): void {
    this.announcementsService.getAnnouncements();
    this.annouuncementSubscription = this.announcementsService
      .getAnnouncementUpdateObserver().subscribe((announcements: IAnnouncement[])=> {
      this.announcements = announcements;
    })
  }

  ngOnDestroy(): void {
    this.annouuncementSubscription?.unsubscribe();
  }

  onDelete(id: string) {
    this.announcementsService.deleteAnnouncement(id);
  }
}
