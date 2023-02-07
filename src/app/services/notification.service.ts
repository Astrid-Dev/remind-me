import { Injectable } from '@angular/core';
import {LocalNotifications} from "@capacitor/local-notifications";
import {Reminder} from "../models/Reminder";
import {ReminderService} from "./reminder.service";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private reminderService: ReminderService) {
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

    LocalNotifications.addListener("localNotificationActionPerformed", (notificationAction) =>{
      if(notificationAction.actionId === 'read'){
        const reminder = notificationAction.notification.extra.reminder;
        const userId = notificationAction.notification.extra.userId;
        if(reminder.isARecord){
          this.reminderService.setAReminderStatusAsRead(reminder.uid, userId);

          const audioRef = new Audio(`data:audio/aac;base64,${reminder.description}`);
          audioRef.oncanplaythrough = () => audioRef.play();
          audioRef.load();
        }
        else{

        }
      }
    });
  }

  async scheduleReminderNotification(reminder: Reminder, userId: string){
    await LocalNotifications.schedule({
      notifications: [
        {
          title: reminder.title,
          body: `Vous avez programmez un rappel pour une activité qui aura lieu ${reminder.reminderTime === 0 ? 'à l\'instant' : ('dans ' + reminder.reminderTime + ' minutes')}`,
          id: new Date().getTime(),
          extra: {
            userId: userId,
            reminder: reminder
          },
          iconColor: '#18314f',
          sound: 'mixkit-happy-bells-notification-937.wav',
          actionTypeId: 'REMINDER_ACTIONS',
          schedule: {
            at: new Date((reminder.date - (reminder.reminderTime * 60 * 1000)))
          }
        }
      ]
    });
  }
}