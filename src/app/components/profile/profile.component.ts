import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import CustomsValidators from 'src/app/helpers/customs.validators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

  currentTab: 'profile' | 'modify-password' = 'profile';

  editProfileForm !: FormGroup;
  editFormIsSubmitted: boolean = false;

  updatePasswordForm !: FormGroup;
  updatePasswordFormIsSubmitted: boolean = false;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder
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


  get formControls(){
    return this.editProfileForm.controls;
  }

  validationHasFailedFor(formControl: string, validator: string){
    let temp = this.formControls[formControl];
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

}
