import {Component, OnInit} from '@angular/core';
import {IAnnouncement} from "../../models/announcement";
import {AnnouncementsService} from "../../services/announcements.service";

@Component({
  selector: 'app-announcement-create',
  templateUrl: './announcement-create.component.html',
  styleUrls: ['./announcement-create.component.scss']
})
export class AnnouncementCreateComponent implements OnInit {
  newAnnouncementContent = '';

  constructor(private announcementsService: AnnouncementsService) {
  }

  ngOnInit(): void {
  }

  onCreateAnnouncement() {
    const newAnnouncement: Partial<IAnnouncement> = {
      content: this.newAnnouncementContent,
    };
    this.announcementsService.createAnnouncement(newAnnouncement)
  }
}
