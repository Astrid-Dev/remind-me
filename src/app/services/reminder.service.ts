import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection,
  DocumentData
} from "@angular/fire/compat/firestore";
import {Reminder} from "../models/Reminder";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class ReminderService {

  constructor(
    private afStore: AngularFirestore,
    private authService: AuthService
  ) {}


  private get remindersPath(){
    return `users/${this.authService.userData?.uid}/reminders`;
  }

  createNewReminder(reminderData: Reminder){
    return new Promise<{reminder: Reminder, userId: string}>((resolve, reject) =>{
      if(!this.authService.isLoggedIn){
        reject('UnAuthenticated user !');
      }
      const newReminderRef: AngularFirestoreDocument<Reminder> = this.afStore.collection(this.remindersPath).doc();
      const newReminderData = {
        ...reminderData,
        uid: newReminderRef.ref.id
      }

      newReminderRef.set(newReminderData)
        .then((res) =>{
        resolve({reminder: newReminderData, userId: this.authService.userData?.uid});
      })
        .catch((err) =>{
          reject(err);
        });
    });
  }

  async setAReminderStatusAsRead(reminderUId: string, userUId = this.authService.userData?.uid){
    const reminderRef: AngularFirestoreDocument = this.afStore.collection(`users/${userUId}/reminders/${reminderUId}`).doc();
    await reminderRef.set({
      hasBeenRead: true
    }, {
      merge: true
    });
  }

  get remindersCollection(): any{
    return this.afStore.collection(this.remindersPath);
  }

}
