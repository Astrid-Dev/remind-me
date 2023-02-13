import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from "@angular/forms";
import CustomsValidators from "../../helpers/customs.validators";
import {ScreenService} from "../../services/screen.service";
import {AuthService} from "../../services/auth.service";
import {User} from "../../models/User";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm !: FormGroup;
  formIsSubmitted: boolean = false;
  isProcessing: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private screenService: ScreenService,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      pseudo: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      // confirm_password: ['', [Validators.required]]
    }
    // , {validator: CustomsValidators.confirmedValidator('password', 'confirm_password')}
    );
  }

  get formControls(){
    return this.registerForm.controls;
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

  onFormSubmit(){
    // this.formIsSubmitted = true;
    //
    // if(!this.registerForm.valid){
    //   this.screenService.presentErrorToast('Formulaire invalide !');
    // }
    // else{
    //   this.isProcessing = true;
    //   this.authService.RegisterUser(this.formControls['email']?.value, this.formControls['password']?.value)
    //     .then((res) =>{
    //       console.log(res);
    //         this.authService.SendVerificationMail();
    //         this.authService.UpdateUSerCredentials({
    //           uid: res.user?.uid,
    //           email: res.user?.email,
    //           photoURL: res.user?.photoURL ?? null,
    //           emailVerified: res.user?.emailVerified ?? false,
    //           displayName: this.formControls['pseudo']?.value
    //         });
    //         this.screenService.presentSuccessToast('Votre compte a été créé avec succès ! Veuillez valider votre compte grace au lien qui vous a été envoyé par mail !');
    //         this.router.navigate(['/verify-email']);
    //     })
    //     .catch((err) =>{
    //       let msg;
    //
    //       switch(err.code){
    //         case 'auth/email-already-in-use': {
    //           msg = ('Cette adresse email est déjà utiliséé ! Veuillez fournir une autre adresse et réessayer');
    //           break;
    //         }
    //         case 'auth/invalid-email': {
    //           msg = ('L\'adresse email est invalide ! Veuillez fournir une adresse valide et réessayer');
    //           break;
    //         }
    //         case 'auth/network-request-failed': {
    //           msg = ('Une erreur s\'est produite lors de la création de votre compte ! Vérifiez votre connexion internet et réessayez !');
    //           break;
    //         }
    //         default: {
    //           msg = ('Une erreur s\'est produite lors de la création de votre compte ! Veuillez réessayer !');
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

  registerWithGoogle(){
    // this.authService.GoogleAuth();
  }

  registerWithFacebook(){
    // this.authService.FacebookAuth();
  }

  registerWithTwitter(){
    // this.authService.TwitterAuth();
  }
}
