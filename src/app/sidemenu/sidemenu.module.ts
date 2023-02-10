import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SidemenuPageRoutingModule } from './sidemenu-routing.module';

import { SidemenuPage } from './sidemenu.page';
import {SharedModule} from "../helpers/shared.module";
import {ProfileComponent} from "../components/profile/profile.component";
import {SettingsComponent} from "../components/settings/settings.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SidemenuPageRoutingModule,
    SharedModule,
  ],
  declarations: [SidemenuPage, ProfileComponent, SettingsComponent]
})
export class SidemenuPageModule {}
