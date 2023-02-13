import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {ScreenService} from "../../services/screen.service";

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.page.html',
  styleUrls: ['./verify-email.page.scss'],
})
export class VerifyEmailPage implements OnInit {

  isProcessing: boolean = false;

  constructor(
    private authService: AuthService,
    private screenService: ScreenService
  ) { }

  ngOnInit() {
  }

  resendEmailVerification(){
    // this.isProcessing = true;
    // this.authService.SendVerificationMail()
    //   .then((res) =>{
    //     this.screenService.presentSuccessToast('L\'email vous a été renvoyé avec succès !');
    //   })
    //   .catch((err) =>{
    //     console.error(err);
    //     this.screenService.presentErrorToast('Une erreur s\'est produite lors du renvoie de l\'email ! Veuillez réessayer !');
    //   })
    //   .finally(() =>{
    //     this.isProcessing = false;
    //   });
  }

}
