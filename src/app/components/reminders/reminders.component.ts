import {Component, OnInit} from '@angular/core';
import {Reminder, ReminderCategories, ReminderPriorities, RemindersGroup} from "../../models/Reminder";
import {ReminderService} from "../../services/reminder.service";
import {collectionData} from "@angular/fire/firestore";
import {getCategoryColor, getCategoryLabel, getPriorityLabel, printReminderDay} from "../../helpers/functions.helpers";

@Component({
  selector: 'app-reminders',
  templateUrl: './reminders.component.html',
  styleUrls: ['./reminders.component.scss'],
})
export class RemindersComponent implements OnInit {

  allReminders: Reminder[] = [];
  remindersGroups: RemindersGroup[] = [];

  selectedState: 'coming' | 'read' | 'missed' = 'coming';
  selectedGroupBy: 'date' | 'category' | 'priority' = 'date';

  reminderDetailsModalIsOpen: boolean = false;
  selectedReminder !: Reminder;

  hasLoadedDataForTheFirstTime: boolean = false;

  constructor(
    private reminderService: ReminderService
  ) {}

  getCategoryColor(category: ReminderCategories){
    return getCategoryColor(category);
  }

  getPriorityClassName(priority: ReminderPriorities){
    return priority === ReminderPriorities.HIGH ? 'high' : priority === ReminderPriorities.MEDIUM ? 'medium' : 'low'
  }

  getReminderHour(datetime: any){
    let result = '';
    if(this.selectedGroupBy !== 'date'){
      result = printReminderDay(datetime) + ' à ';
    }

    result += new Date(datetime).toLocaleTimeString().slice(0, 5).replace(':', 'h');

    return result;
  }

  ngOnInit() {
    setTimeout(() =>{
      collectionData(this.reminderService.remindersCollection.ref)
        .subscribe((data: any) =>{
          if(!this.hasLoadedDataForTheFirstTime){
            this.hasLoadedDataForTheFirstTime = true;
          }
          this.allReminders = data;
          console.log(this.allReminders);
          this.setRemindersGroups();
        })
    }, 2000);
  }

  onStateChange(newState: any){
    this.selectedState = newState;
    this.setRemindersGroups();
  }

  setRemindersGroups(){
    let data = [];
    if(this.selectedState === 'read'){
      data = this.allReminders.filter(elt => elt.hasBeenRead);
    }
    else if(this.selectedState === 'missed'){
      data = this.allReminders.filter(elt => !elt.hasBeenRead);
    }
    else{
      data = this.allReminders.filter((elt) =>{
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const afterTomorrow = new Date(today.getTime() + (2*24*60*60*1000));
        return elt.date >= today.getTime() && elt.date < afterTomorrow.getTime();
        // return true;
      });
    }
    data.sort((a, b) => (a.date - b.date));
    let categories = Object.values(ReminderCategories);
    let priorities = Object.values(ReminderPriorities);

    let result :RemindersGroup[] = [];
    if(this.selectedGroupBy === 'date'){
      let differentDays = [...new Set(data.map(elt =>{
        let date = new Date(elt.date);
        date.setHours(0, 0, 0, 0);
        return date.getTime();
      }))];

      for(let i = 0; i < differentDays.length; i++){
        result.push({
          label: printReminderDay(differentDays[i]),
          reminders: data.filter(elt => (new Date(elt.date).getTime() >= differentDays[i] && new Date(elt.date).getTime() < (differentDays[i] + (24*60*60*1000)))),
        });
      }
    }
    else if(this.selectedGroupBy === 'category'){
      for(let i = (categories.length/2); i < categories.length; i++){
        result.push({
          label: getCategoryLabel(categories[i] as ReminderCategories),
          reminders: data.filter(elt => elt.categories.includes(categories[i] as ReminderCategories)),
        });
      }
    }
    else if(this.selectedGroupBy === 'priority'){
      for(let i = (priorities.length/2); i < priorities.length; i++){
        result.push({
          label: getPriorityLabel(priorities[i] as ReminderPriorities),
          reminders: data.filter(elt => elt.priority === priorities[i]),
        });
      }
    }

    this.remindersGroups = result.filter(elt => elt.reminders.length > 0);
  }

  viewReminderDetails(reminder: Reminder){
    this.selectedReminder = reminder;
    this.reminderDetailsModalIsOpen = true;
  }

}
