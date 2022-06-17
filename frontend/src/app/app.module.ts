import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AnnouncementsBoardComponent } from './announcements-board/components/main-announcements-board/announcements-board.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AnnouncementCreateComponent } from './announcements-board/components/announcement-create/announcement-create.component';
import { AnnouncementListComponent } from './announcements-board/components/announcement-list/announcement-list.component';
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    AnnouncementsBoardComponent,
    AnnouncementCreateComponent,
    AnnouncementListComponent
  ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
