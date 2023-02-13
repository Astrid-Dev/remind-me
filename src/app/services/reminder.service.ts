import { Injectable } from '@angular/core';
import {Reminder} from "../models/Reminder";
import {BehaviorSubject, Observable} from "rxjs";
import {Storage} from "@ionic/storage-angular";
import {generateUniqueID} from "../helpers/functions.helpers";

const REMINDERS_KEY = 'REMINDERS';

@Injectable({
  providedIn: 'root'
})
export class ReminderService {

  private _storage: Storage | null = null;
  private _reminders: BehaviorSubject<Reminder[]> = new BehaviorSubject<Reminder[]>([]);
  public storedReminders: Observable<Reminder[]> = this._reminders.asObservable();

  constructor(
    private storage: Storage
  ) {
    this.init();
  }

  async init() {
    this._storage = await this.storage['create']();
    this.retrieveReminders();
  }

  retrieveReminders(){
    this._storage?.get(REMINDERS_KEY)
      .then((data: Reminder[]) =>{
        this._reminders.next(data ?? []);
      });
  }

  createNewReminder(reminderData: Reminder){
    return new Promise<Reminder>((resolve, reject) =>{
      let temp = this._reminders.getValue();
      temp.unshift({
        ...reminderData,
        uid: generateUniqueID()
      });
      this._storage?.set(REMINDERS_KEY, temp)
        .then((res) =>{
          this.retrieveReminders();
          resolve(temp[0]);
        })
        .catch((err) =>{
          reject(err);
        });
    });
  }

  deleteAReminder(reminderUId: string){
    return new Promise((resolve, reject) =>{
      let temp = this._reminders.getValue();
      temp = temp.filter((elt) => elt.uid !== reminderUId);
      this._storage?.set(REMINDERS_KEY, temp).
      then((res) =>{
        this.retrieveReminders();
        resolve(true);
      })
        .catch((err) =>{
          reject(err);
        });
    });
  }

  async setAReminderStatusAsRead(reminderUId: string){
    let temp = this._reminders.getValue();
    temp.forEach((elt, index, array) =>{
      if(elt.uid === reminderUId){
        array[index] = {
          ...elt,
          hasBeenRead: true
        }
      }
    });

    this._storage?.set(REMINDERS_KEY, temp);
    this.retrieveReminders();
  }

}
