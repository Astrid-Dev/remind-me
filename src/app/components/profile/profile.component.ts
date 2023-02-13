import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import CustomsValidators from 'src/app/helpers/customs.validators';
import {ScreenService} from "../../services/screen.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

  currentTab: 'profile' | 'modify-password' = 'profile';

  editProfileForm !: FormGroup;
  editProfileFormIsSubmitted: boolean = false;

  updatePasswordForm !: FormGroup;
  updatePasswordFormIsSubmitted: boolean = false;

  isProcessing: boolean = false;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private screenService: ScreenService
  ) {
    this.editProfileForm = this.formBuilder.group({
      username: [this.authService.userData.displayName, [Validators.required]],
      email: [this.authService.userData.email, [Validators.required, Validators.email]]
    });

    this.updatePasswordForm = this.formBuilder.group({
      oldPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      newPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      confirmPassword: ['', [Validators.required]],
    },{
      validator: CustomsValidators.confirmedValidator('newPassword', 'confirmPassword'),
    });
  }

  get userData(){
    return this.authService.userData;
  }

  get userShortName(){
    return this.userData?.displayName?.split(' ').slice(0, 2).map((elt: string) =>elt.charAt(0)).join('').toUpperCase();
  }

  get editProfileFormControls(){
    return this.editProfileForm.controls;
  }

  get updatePasswordFormControls(){
    return this.editProfileForm.controls;
  }

  get canSubmitEditProfileForm(){
    return (this.editProfileForm.valid && ((this.editProfileFormControls['username']?.value !== this.userData.displayName) ||
      (this.editProfileFormControls['email']?.value !== this.userData.email)))
  }

  get canSubmitUpdatePasswordForm(){
    return this.updatePasswordForm.valid;
  }

  validationHasFailedFor(form: string, formControl: string, validator: string){
    let temp = form === 'profile' ? this.editProfileFormControls[formControl] : this.updatePasswordFormControls[formControl];
    let result = false;

    if(temp && temp?.errors){
      result = !!(temp?.errors[validator]);
    }

    return result;
  }

  ngOnInit() {}

  onTabChange(event: any){
    this.currentTab = event.detail.value;
  }

  onProfileFormSubmit(){
    // this.editProfileFormIsSubmitted = true;
    //
    // if(!this.editProfileForm.valid){
    //   this.screenService.presentErrorToast('Formulaire invalide');
    //   return;
    // }
    //
    // this.isProcessing = true;
    // this.authService.UpdateUSerCredentials({
    //   displayName: this.editProfileFormControls['username']?.value,
    //   email: this.editProfileFormControls['email']?.value
    // })
    //   .then((res) =>{
    //     this.screenService.presentSuccessToast('Votre profile été modifié avec succès');
    //   })
    //   .catch((err) =>{
    //     console.error(err);
    //     this.screenService.presentErrorToast('Une erreur s\'est produite lors la modification de votre profile ! Veuillez réessayer !');
    //   })
    //   .finally(() =>{
    //     this.isProcessing = false;
    //   });
  }

  onPasswordFormSubmit(){
    // this.updatePasswordFormIsSubmitted = true;
    //
    // if(!this.updatePasswordForm.valid){
    //   this.screenService.presentErrorToast('Formulaire invalide');
    //   return;
    // }
    //
    // this.isProcessing = true;
    // this.authService.UpdateUSerCredentials({
    //   password: this.updatePasswordFormControls['newPassword']?.value,
    // })
    //   .then((res) =>{
    //     this.screenService.presentSuccessToast('Votre mot de passe été modifié avec succès');
    //   })
    //   .catch((err) =>{
    //     console.error(err);
    //     this.screenService.presentErrorToast('Une erreur s\'est produite lors la modification de votre mot de passe ! Veuillez réessayer !');
    //   })
    //   .finally(() =>{
    //     this.isProcessing = false;
    //   });
  }

}
