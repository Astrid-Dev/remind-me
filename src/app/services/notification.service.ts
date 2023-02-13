import { Injectable } from '@angular/core';
import {LocalNotifications} from "@capacitor/local-notifications";
import {Reminder} from "../models/Reminder";
import {ReminderService} from "./reminder.service";
import {SpeakerService} from "./speaker.service";
import {SettingsService} from "./settings.service";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private reminderService: ReminderService,
    private speakerService: SpeakerService,
    private settingsService: SettingsService
  ) {
    LocalNotifications.requestPermissions();
    LocalNotifications.registerActionTypes({
      types: [
        {
          id: 'REMINDER_ACTIONS',
          actions: [
            {
              id: 'read',
              title: 'Lire'
            },
            {
              id: 'ignore',
              title: 'Ignorer',
              destructive: true
            }
          ]
        }
      ]
    });

    LocalNotifications.addListener('localNotificationReceived',  (notification) => {
      if(this.settingsService.settings.shouldReadNotifications){
        this.speakerService.speak(notification.largeBody ?? 'Nouveau rappel de Remind me');
      }
    });

    LocalNotifications.addListener("localNotificationActionPerformed", (notificationAction) =>{
      if(notificationAction.actionId === 'read'){
        const reminder = notificationAction.notification.extra.reminder;
        if(reminder.isARecord){
          this.reminderService.setAReminderStatusAsRead(reminder.uid);

          const audioRef = new Audio(`data:audio/aac;base64,${reminder.description}`);
          audioRef.oncanplaythrough = () => audioRef.play();
          audioRef.load();
        }
        else{
          this.speakerService.speak(reminder.description);
        }
      }
    });
  }

  async scheduleReminderNotification(reminder: Reminder){
    const body = `Vous avez programmez un rappel pour une activité qui aura lieu ${reminder.reminderTime === 0 ? 'à l\'instant' : ('dans ' + reminder.reminderTime + ' minutes')}`;
    await LocalNotifications.schedule({
      notifications: [
        {
          title: reminder.title,
          body: body,
          largeBody: body,
          id: (Math.floor(Math.random()*90000) + 10000),
          extra: {
            reminder: reminder
          },
          iconColor: '#18314f',
          sound: 'mixkit_happy_bells_notification_937.wav',
          actionTypeId: 'REMINDER_ACTIONS',
          schedule: {
            at: new Date((reminder.date - (reminder.reminderTime * 60 * 1000)))
          }
        }
      ]
    });
  }
}
