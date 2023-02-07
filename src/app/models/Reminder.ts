export interface Reminder {
  uid?: string;
  title: string;
  description: string;
  date: number;
  reminderTime: number;
  isARecord: boolean;
  hasBeenRead?: boolean;
  recordDuration?: number;
  priority: ReminderPriorities;
  categories: ReminderCategories[];
}

export enum ReminderPriorities {
  LOW,
  MEDIUM,
  HIGH
}

export enum ReminderCategories{
  WORK,
  PERSONAL,
  FRIENDS,
  FAMILY,
  OTHERS
}

export interface RemindersGroup{
  label: string;
  reminders: Reminder[];
}
