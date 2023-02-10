import { Component } from '@angular/core';
import {NotificationService} from "./services/notification.service";
import {SettingsService} from "./services/settings.service";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private notificationService: NotificationService, private settingsService: SettingsService) {}
}
