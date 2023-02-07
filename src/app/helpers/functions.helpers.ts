import {ReminderCategories, ReminderPriorities} from "../models/Reminder";

export function getPriorityColor(priority: ReminderPriorities){
  let color;

  switch(priority){
    case ReminderPriorities.HIGH:{
      color = 'danger';
      break;
    }
    case ReminderPriorities.MEDIUM:{
      color = 'warning';
      break;
    }
    case ReminderPriorities.LOW:{
      color = 'success';
      break;
    }
    default:{
      color = 'primary';
      break;
    }
  }

  return color;
}

export function getPriorityLabel(priority: ReminderPriorities){
  let label;

  switch(priority){
    case ReminderPriorities.HIGH:{
      label = 'Elevée';
      break;
    }
    case ReminderPriorities.MEDIUM:{
      label = 'Moyenne';
      break;
    }
    case ReminderPriorities.LOW:{
      label = 'Faible';
      break;
    }
    default:{
      label = '';
      break;
    }
  }

  return label;
}

export function getCategoryLabel(category: ReminderCategories){
  let label;

  switch(category){
    case ReminderCategories.FAMILY:{
      label = 'Famille';
      break;
    }
    case ReminderCategories.FRIENDS:{
      label = 'Amis';
      break;
    }
    case ReminderCategories.PERSONAL:{
      label = 'Personnel';
      break;
    }
    case ReminderCategories.WORK:{
      label = 'Travail';
      break;
    }
    case ReminderCategories.OTHERS:{
      label = 'Autres';
      break;
    }
    default:{
      label = '';
      break;
    }
  }

  return label;
}

export function getCategoryColor(category: ReminderCategories){
  let color;

  switch(category){
    case ReminderCategories.FAMILY:{
      color = 'secondary';
      break;
    }
    case ReminderCategories.FRIENDS:{
      color = 'tertiary';
      break;
    }
    case ReminderCategories.PERSONAL:{
      color = 'custom1';
      break;
    }
    case ReminderCategories.WORK:{
      color = 'custom2';
      break;
    }
    case ReminderCategories.OTHERS:{
      color = 'dark';
      break;
    }
    default:{
      color = 'primary';
      break;
    }
  }

  return color;
}

export function parseDateToISOFormat(date: Date){
  let z = date.getTimezoneOffset() * 60 * 1000;
  let localDate = new Date(date.getTime() - z);

  return localDate.toISOString().slice(0, 19);
}

export function printReadableDate(date: Date, printMonth: boolean = false, printHours: boolean = false, lang='fr'){
  const englishDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const frenchDays = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];

  const englishMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const frenchMonths = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aou', 'Sep', 'Oct', 'Nov', 'Déc'];

  const days = lang === 'fr' ? frenchDays : englishDays;
  const months = lang === 'fr' ? frenchMonths : englishMonths;

  const hours = (lang === 'fr' ? ' à ' : ' at ') + (date.toLocaleTimeString());

  return printMonth ? (days[date.getDay()] + ', ' + date.getDate() + ' '+ months[date.getMonth()] + ' '+ date.getFullYear() + (printHours ? hours : '')) : (days[date.getDay()] + ', '+ date.toLocaleDateString());
}

export function getMonthNameByMonthNumber(monthNumber: number){
  const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobtre', 'Novembre', 'Dècembre'];

  return months[monthNumber] ?? '';
}

export function getDayNameByDayNumber(dayNumber: number){
  const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];

  return days[dayNumber] ?? '';
}

export function printReminderDay(datetime: number){
  const ONE_DAY = (24*60*60*1000);
  const date = new Date(datetime);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today.getTime() + ONE_DAY);
  const afterTomorrow = new Date(today.getTime() + (2*ONE_DAY));
  const yesterday = new Date(today.getTime() - ONE_DAY);

  const isToday = (date.getTime() >= today.getTime() && date.getTime() < tomorrow.getTime());
  const isTomorrow = (date.getTime() >= tomorrow.getTime() && date.getTime() < afterTomorrow.getTime());
  const isAfterTomorrow = (date.getTime() >= afterTomorrow.getTime() && date.getTime() < (afterTomorrow.getTime() + ONE_DAY));
  const isYesterday = (date.getTime() >= yesterday.getTime() && date.getTime() < today.getTime());

  let result = '';

  if(isToday){
    result = 'Aujourd\'hui';
  }
  else if(isTomorrow){
    result = 'Demain';
  }
  else if(isAfterTomorrow){
    result = 'Après demain';
  }
  else if(isYesterday){
    result = 'Hier';
  }
  else{
    result = printReadableDate(date, true);
  }

  return result;
}
