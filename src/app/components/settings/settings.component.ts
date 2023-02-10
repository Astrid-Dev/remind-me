import { Component, OnInit } from '@angular/core';
import {SettingsService} from "../../services/settings.service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {

  reminderTime: number = 15;
  shouldReadNotifications: boolean = false;

  constructor(private settingsService: SettingsService) { }

  ngOnInit() {
    this.reminderTime = this.settingsService.settings.defaultReminderTime ?? 15;
    this.shouldReadNotifications = this.settingsService.settings.shouldReadNotifications;
  }

  saveSettings(){
    this.settingsService.saveNewSettings({
      defaultReminderTime: this.reminderTime,
      shouldReadNotifications: this.shouldReadNotifications
    });
  }

}
