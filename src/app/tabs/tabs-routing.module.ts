import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';
import {RemindersComponent} from "../components/reminders/reminders.component";
import {NotificationsComponent} from "../components/notifications/notifications.component";
import {CalendarComponent} from "../components/calendar/calendar.component";

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'reminders',
        component: RemindersComponent
      },
      {
        path: 'notifications',
        component: NotificationsComponent
      },
      {
        path: 'calendar',
        component: CalendarComponent
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'reminders'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
