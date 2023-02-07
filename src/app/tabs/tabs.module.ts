import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabsPageRoutingModule } from './tabs-routing.module';

import { TabsPage } from './tabs.page';
import {SharedModule} from "../helpers/shared.module";
import {CalendarComponent} from "../components/calendar/calendar.component";
import {RemindersComponent} from "../components/reminders/reminders.component";
import {NotificationsComponent} from "../components/notifications/notifications.component";
import {ReminderDetailsComponent} from "../components/reminder-details/reminder-details.component";
import {NewReminderComponent} from "../components/new-reminder/new-reminder.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabsPageRoutingModule,
    SharedModule
  ],
    declarations: [TabsPage, CalendarComponent, RemindersComponent, NotificationsComponent, ReminderDetailsComponent, NewReminderComponent]
})
export class TabsPageModule {}
