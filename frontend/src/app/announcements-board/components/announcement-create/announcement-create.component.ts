import {Component, OnInit} from '@angular/core';
import {IAnnouncement} from "../../models/announcement";
import {AnnouncementsService} from "../../services/announcements.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-announcement-create',
  templateUrl: './announcement-create.component.html',
  styleUrls: ['./announcement-create.component.scss']
})
export class AnnouncementCreateComponent implements OnInit {

  constructor(private announcementsService: AnnouncementsService) {
  }

  ngOnInit(): void {
  }

  onCreateAnnouncement(createAnnouncementForm: NgForm) {
    if (createAnnouncementForm.invalid) {
      return
    }
    const newAnnouncement: Partial<IAnnouncement> = {
      content: createAnnouncementForm.value.contentInput,
    };
    this.announcementsService.createAnnouncement(newAnnouncement)
    createAnnouncementForm.value.contentInput = "";
  }
}
