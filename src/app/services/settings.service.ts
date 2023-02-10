import { Injectable } from '@angular/core';

interface Settings{shouldReadNotifications: boolean, defaultReminderTime: number}

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private $settings!: Settings;

  constructor() {
    const temp = localStorage.getItem('settings');
    if(temp){
      this.$settings = JSON.parse(temp);
    }
    else{
      this.$settings = {shouldReadNotifications: false, defaultReminderTime: 15};
      localStorage.setItem('settings', JSON.stringify(this.$settings));
    }
  }

  get settings(){
    return this.$settings;
  }

  saveNewSettings(newSettings: Settings){
    this.$settings = newSettings;
    localStorage.setItem('settings', JSON.stringify(this.$settings));
  }


}
