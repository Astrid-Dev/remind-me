import { Component, OnInit } from '@angular/core';
import {AuthService} from "../services/auth.service";
import {ScreenService} from "../services/screen.service";
import {FormControl, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.page.html',
  styleUrls: ['./sidemenu.page.scss'],
})
export class SidemenuPage implements OnInit {

  isLoggingOut: boolean = false;

  constructor(
    private authService: AuthService,
    private screenService: ScreenService,
    private router: Router
  ) { }

  get userData(){
    return this.authService.userData;
  }

  get userShortName(){
    return this.userData?.displayName?.split(' ').slice(0, 2).map((elt: string) =>elt.charAt(0)).join('').toUpperCase();
  }

  ngOnInit() {
  }

  logOut(){
    // this.screenService.presentAlert({
    //   mode: "ios",
    //   message: "Voulez-vous vraiment vous déconnecter ?",
    //   buttons: [
    //     {
    //       text: 'Non',
    //       role: 'cancel'
    //     },
    //     {
    //       text: 'Oui',
    //       handler: () =>{
    //         this.isLoggingOut = true;
    //         const temp = this.userData.displayName;
    //         this.authService.SignOut()
    //           .then((res) =>{
    //             this.screenService.presentSuccessToast(`Vous êtes désormais déconnecté, ${temp} ! À bientôt !`);
    //
    //           })
    //           .catch((err) =>{
    //             this.screenService.presentErrorToast('Une erreur s\'est produite lors de votre déconnexion ! Veuillez réessayer !');
    //             this.router.navigate(['/login']);
    //           })
    //           .finally(() =>{
    //             this.isLoggingOut = false;
    //           });
    //       }
    //     }
    //   ]
    // });
  }

}
