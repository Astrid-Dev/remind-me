import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SidemenuPageRoutingModule } from './sidemenu-routing.module';

import { SidemenuPage } from './sidemenu.page';
import {SharedModule} from "../helpers/shared.module";
import {ProfileComponent} from "../components/profile/profile.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SidemenuPageRoutingModule,
    SharedModule,
  ],
  declarations: [SidemenuPage, ProfileComponent]
})
export class SidemenuPageModule {}
