import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {IAnnouncement} from "../../models/announcement";
import {AnnouncementsService} from "../../services/announcements.service";

export enum FilterType {
  All = 'All',
  Week = 'Week',
  Month = 'Month',
  Today = 'Today',
};

@Component({
  selector: 'app-announcements-board',
  templateUrl: './announcements-board.component.html',
  styleUrls: ['./announcements-board.component.scss']
})
export class AnnouncementsBoardComponent implements OnInit {
  filterType: string | undefined;
  filterOptions = [
    { name: "Today", value: FilterType.Today },
    { name: "Last 7 days", value: FilterType.Week },
    { name: "Last Month", value: FilterType.Month },
    { name: "All", value: FilterType.All }
  ];

  constructor(private announcementsService: AnnouncementsService) {
  }

  ngOnInit(): void {
  }

  onFilterChange(event: Event) {
    type ObjectKey = keyof typeof FilterType;
    let newFilter = (event.target as HTMLInputElement)?.value as ObjectKey;
    this.announcementsService.getAnnouncementsForPeriod(FilterType[newFilter]);
  }
}
