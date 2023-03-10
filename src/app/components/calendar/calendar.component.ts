import { Component, OnInit } from '@angular/core';
import {getCategoryColor, getDayNameByDayNumber, getMonthNameByMonthNumber, printReminderDay} from "../../helpers/functions.helpers";
import {Reminder, ReminderCategories, ReminderPriorities} from "../../models/Reminder";
import {ReminderService} from "../../services/reminder.service";
import {collectionData} from "@angular/fire/firestore";
import {ScreenService} from "../../services/screen.service";

const ONE_DAY = 24*60*60*1000;

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {

  selectedMonth: number = 0;
  selectedDate: number = 1;
  weeks: ((number | null)[])[] = [];
  allReminders: Reminder[] = [];
  remindersToDisplay: Reminder[] = [];

  reminderDetailsModalIsOpen: boolean = false;
  selectedReminder !: Reminder;

  hasLoadedData: boolean = false;

  constructor(
    private reminderService: ReminderService,
    private screenService: ScreenService
  ) { }

  get currentMonth(){
    return new Date().getMonth();
  }

  get isLastMonth(){
    return this.selectedMonth === 11;
  }

  get isFirstMonth(){
    return this.selectedMonth === 0;
  }

  getMonthName(monthNumber: number){
    return getMonthNameByMonthNumber(monthNumber);
  }

  getDayName(dayNumber: number){
    return getDayNameByDayNumber(dayNumber).slice(0, 3);
  }

  isSelectedDate(date: number | null){
    return (this.selectedDate === date && this.selectedMonth === this.currentMonth);
  }

  isCurrentDate(date: number | null){
    return (date === new Date().getDate() && this.selectedMonth === this.currentMonth);
  }

  isAPassedDate(date: number | null){
    if(!date){
      return true;
    }
    let temp = new Date();
    return ((temp.getDate() > date && this.selectedMonth <= this.currentMonth) || (this.selectedMonth < this.currentMonth));
  }

  getCategoryColor(category: ReminderCategories){
    return getCategoryColor(category);
  }

  getPriorityClassName(priority: ReminderPriorities){
    return priority === ReminderPriorities.HIGH ? 'high' : priority === ReminderPriorities.MEDIUM ? 'medium' : 'low'
  }

  getReminderHour(datetime: any){
    return new Date(datetime).toLocaleTimeString().slice(0, 5).replace(':', 'h');
  }

  dateHaveReminders(date: number | null){
    if(date === null) return false;

    let involvedDatetime = new Date(new Date().getFullYear(), this.selectedMonth, date, 0, 0, 0).getTime();
    return this.allReminders.filter((elt) => ((elt.date >= involvedDatetime) && (elt.date < (involvedDatetime + ONE_DAY)))).length > 0;
  }

  ngOnInit() {
    this.selectedMonth = this.currentMonth;
    this.selectedDate = new Date().getDate();
    this.setDates();
    this.reminderService.storedReminders.subscribe((data) =>{
      if(!this.hasLoadedData){
        this.hasLoadedData = true;
      }
      this.allReminders = data;
      console.log(this.allReminders);
      this.setRemindersToDisplay();
    });
  }

  setDates(){
    let dates: {day: number, value: number | null}[] = [];

    let baseDate = new Date(new Date().getFullYear(), this.selectedMonth, 1, 0, 0, 0);
    let involvedDateTime = baseDate.getTime();
    console.log(baseDate)

    if(baseDate.getDay() !== 1){
      let temp = involvedDateTime;
      while (new Date(temp).getDay() !== 1){
        temp -= (ONE_DAY);
        dates.unshift({
          day: new Date(temp).getDay(),
          value: null
        });
      }
    }

    while((new Date(involvedDateTime).getMonth() === baseDate.getMonth())){
      const date = new Date(involvedDateTime);
      dates.push({
        day: date.getDay(),
        value: date.getDate()
      });
      involvedDateTime += ONE_DAY;
    }

    this.weeks = [];
    for(let i = 0; i < dates.length; i = i + 7){
      this.weeks.push(dates.slice(i, i+7).map(elt => elt.value));
    }
    this.setRemindersToDisplay();
  }

  setRemindersToDisplay(){
    let involvedDatetime = new Date(new Date().getFullYear(), this.selectedMonth, this.selectedDate, 0, 0, 0).getTime();
    this.remindersToDisplay = this.allReminders.filter((elt) => ((elt.date >= involvedDatetime) && (elt.date < (involvedDatetime + ONE_DAY)))).sort((a, b) => (b.date - a.date));
  }

  goForward(){
    if(this.isLastMonth){
      return;
    }

    this.selectedMonth++;
    this.setDates();
  }

  goBack(){
    if(this.isFirstMonth){
      return;
    }

    this.selectedMonth--;
    this.setDates();
  }

  onDateChange(date: number | null){
    if(!date){
      return;
    }

    this.selectedDate = date;
    this.setRemindersToDisplay();
  }

  viewReminderDetails(reminder: Reminder){
    this.selectedReminder = reminder;
    this.reminderDetailsModalIsOpen = true;
  }

  deleteReminder(reminderUId: any){
    this.screenService.presentAlert({
      mode: "ios",
      message: "Confirmez-vous la suppression de ce rappel ?",
      buttons: [
        {
          text: 'Non',
          role: 'cancel'
        },
        {
          text: 'Oui',
          handler: () =>{
            this.reminderService.deleteAReminder(reminderUId)
              .then((res) =>{
                this.screenService.presentSuccessToast(`Le rappel a ??t?? supprim?? avec succ??s !`);

              })
              .catch((err) =>{
                this.screenService.presentErrorToast('Une erreur s\'est produite lors de la suppression du rappel ! Veuillez r??essayer !');
              });
          }
        }
      ]
    });
  }

}
