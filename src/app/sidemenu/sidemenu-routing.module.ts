import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SidemenuPage } from './sidemenu.page';
import {NewReminderComponent} from "../components/new-reminder/new-reminder.component";
import {ProfileComponent} from "../components/profile/profile.component";

const routes: Routes = [
  {
    path: '',
    component: SidemenuPage,
    children: [
      {
        path: 'app',
        loadChildren: () => import('../tabs/tabs.module').then( m => m.TabsPageModule)
      },
      {
        path: 'new-reminder',
        component: NewReminderComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'app'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SidemenuPageRoutingModule {}
