import { Component, OnInit } from '@angular/core';
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.page.html',
  styleUrls: ['./sidemenu.page.scss'],
})
export class SidemenuPage implements OnInit {

  constructor(
    private authService: AuthService
  ) { }

  get userData(){
    return this.authService.userData;
  }

  get userShortName(){
    return this.userData?.displayName?.split(' ').slice(0, 2).map((elt: string) =>elt.charAt(0)).join('').toUpperCase();
  }

  ngOnInit() {
  }

}
