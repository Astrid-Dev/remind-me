import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {ScreenService} from "../../services/screen.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm !: FormGroup;
  formIsSubmitted: boolean = false;
  passwordFieldType: 'text' | 'password' = 'password';

  isProcessing: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private screenService: ScreenService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]]
    });
  }

  get formControls(){
    return this.loginForm.controls;
  }

  validationHasFailedFor(formControl: string, validator: string){
    let temp = this.formControls[formControl];
    let result = false;

    if(temp && temp?.errors){
      result = !!(temp?.errors[validator]);
    }

    return result;
  }

  ngOnInit() {
  }

  changePasswordFieldType(){
    if(this.passwordFieldType === 'text'){
      this.passwordFieldType = 'password';
    }
    else{
      this.passwordFieldType = 'text';
    }
  }

  onFormSubmit(){
    // this.formIsSubmitted = true;
    //
    // if(!this.loginForm.valid){
    //   this.screenService.presentErrorToast('Formulaire invalide !');
    // }
    // else{
    //   this.isProcessing = true;
    //   this.authService.SignIn(this.formControls['email']?.value, this.formControls['password']?.value)
    //     .then((res) =>{
    //       console.log(res);
    //       console.log(this.authService.isEmailVerified)
    //       if(this.authService.isEmailVerified){
    //         this.screenService.presentSuccessToast(`Salut, ${res.user?.displayName} ! Vous ??tes d??sormais connect??(e) !`);
    //         this.router.navigate(['/app/reminders']);
    //       }
    //       else{
    //         this.screenService.presentWarningToast('Votre adresse email n\'est pas v??rifi??e !');
    //       }
    //     })
    //     .catch((err) =>{
    //       let msg;
    //
    //       switch(err.code){
    //         case 'auth/wrong-password': {
    //           msg = ('Identifiants incorrects !');
    //           break;
    //         }
    //         case 'auth/user-not-found': {
    //           msg = ('Identifiants incorrects !');
    //           break;
    //         }
    //         case 'auth/invalid-email': {
    //           msg = ('L\'adresse email est invalide ! Veuillez fournir une adresse valide et r??essayer');
    //           break;
    //         }
    //         case 'auth/network-request-failed': {
    //           msg = ('Une erreur s\'est produite lors de la cr??ation de votre compte ! V??rifiez votre connexion internet et r??essayez !');
    //           break;
    //         }
    //         case 'auth/weak-password': {
    //           msg = ('Le mot de passe fournit est faible !');
    //           break;
    //         }
    //         default: {
    //           msg = ('Une erreur s\'est produite lors de la connexion ?? votre compte ! Veuillez r??essayer !');
    //           break;
    //         }
    //       }
    //
    //       console.error(err);
    //       this.screenService.presentErrorToast(msg);
    //     })
    //     .finally(() =>{
    //       this.isProcessing = false
    //     });
    // }
  }

  loginWithGoogle(){
    // this.authService.GoogleAuth();
  }

  loginWithFacebook(){
    // this.authService.FacebookAuth();
  }

  loginWithTwitter(){
    // this.authService.TwitterAuth();
  }

}
