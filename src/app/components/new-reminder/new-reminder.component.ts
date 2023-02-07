import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Directory, FileInfo, Filesystem} from "@capacitor/filesystem";
import {VoiceRecorder} from 'capacitor-voice-recorder';
import {GestureController} from "@ionic/angular";
import {ScreenService} from "../../services/screen.service";
import {Reminder, ReminderCategories, ReminderPriorities} from "../../models/Reminder";
import {
  getCategoryColor,
  getCategoryLabel,
  getPriorityColor,
  getPriorityLabel,
  parseDateToISOFormat
} from "../../helpers/functions.helpers";
import {AbstractControl, FormBuilder, FormGroup, Validators, FormControl} from "@angular/forms";
import {Router} from "@angular/router";
import {ReminderService} from "../../services/reminder.service";
import {NotificationService} from "../../services/notification.service";

const MAX_RECORDING_TIME = 5 * 60;

@Component({
  selector: 'app-new-reminder',
  templateUrl: './new-reminder.component.html',
  styleUrls: ['./new-reminder.component.scss'],
})
export class NewReminderComponent implements OnInit, AfterViewInit {

  @ViewChild('recordButton', {read: ElementRef}) recordButton !: ElementRef;

  newReminderForm !: FormGroup;
  previousDescription: string | null = null;
  formIsSubmitted: boolean = false;
  isProcessing: boolean = false;
  minDate: string = parseDateToISOFormat(new Date());

  isRecording: boolean = false;
  recordedFileBase64: string | null = null;
  audioRef !: HTMLAudioElement | undefined;
  isPlayingAudio: boolean | null = null;
  storedFileNames: FileInfo[] = [];
  categories: { value: ReminderCategories, isChecked: boolean, color: string; label: string; }[] = [];
  priorities: {value: ReminderPriorities, isChecked: boolean, color: string; label: string;}[] = [];

  recordDuration: number = 0;
  recordDurationDisplay: string = '';
  playDurationDisplay: string = '';
  playDurationPercentage: number = 0;

  constructor(
    private gestureCtrl: GestureController,
    private screenService: ScreenService,
    private formBuilder: FormBuilder,
    private reminderService: ReminderService,
    private notificationService: NotificationService,
    private router: Router
  ) {
    this.newReminderForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      date: ['', [Validators.required]],
      reminderTime: [15, [Validators.required]],
      description: ['', [Validators.required]],
    });
  }

  get chooseCategories(){
    return this.categories.filter(elt => elt.isChecked).map(elt => elt.value);
  }

  get selectedPriority(){
    return this.priorities.find(elt => elt.isChecked)?.value;
  }

  get formControls(){
    return this.newReminderForm.controls;
  }

  validationHasFailedFor(formControl: string, validator: string){
    let temp = this.formControls[formControl];
    let result = false;

    if(temp && temp?.errors){
      result = !!(temp?.errors[validator]);
    }

    return result;
  }

  ngOnInit() {
    VoiceRecorder.requestAudioRecordingPermission();

    const temp = Object.values(ReminderCategories);
    const temp2 = Object.values(ReminderPriorities);

    for(let i = (temp.length / 2); i < temp.length; i++){
      this.categories.push({
        value: temp[i] as ReminderCategories,
        isChecked: false,
        label: getCategoryLabel(temp[i] as ReminderCategories),
        color: getCategoryColor(temp[i] as ReminderCategories)
      });
    }

    for(let i = (temp2.length / 2); i < temp2.length; i++){
      this.priorities.push({
        value: temp2[i] as ReminderPriorities,
        isChecked: (temp2[i] === ReminderPriorities.LOW),
        label: getPriorityLabel(temp2[i] as ReminderPriorities),
        color: getPriorityColor(temp2[i] as ReminderPriorities)
      });
    }
  }

  ngAfterViewInit() {
    const longPress = this.gestureCtrl.create({
      el: this.recordButton.nativeElement,
      threshold: 0,
      gestureName: 'long-press',
      onStart: (ev) =>{
        // Haptics.impact({style: ImpactStyle.Heavy});
        this.startRecording();
        this.calculateRecordDuration();
      },
      onEnd: (ev) =>{
        // Haptics.impact({style: ImpactStyle.Light});
        this.stopRecording();
      }
    }, true);

    longPress.enable();
  }

  onSelectPriority(priorityIndex: number){
    this.priorities.forEach((elt, index, array) =>{
      array[index] = {
        ...elt,
        isChecked: priorityIndex === index
      }
    });
  }

  onToggleCategory(category: ReminderCategories){
    this.categories.forEach((elt, index, array) =>{
      array[index] = {
        ...elt,
        isChecked: ((elt.value === category) && ((this.chooseCategories.length < 3) || (this.chooseCategories.length === 3 && elt.isChecked))) ? !elt.isChecked : elt.isChecked
      }
    });
  }

  stopRecording(){
    if(!this.isRecording){
      return;
    }

    VoiceRecorder.stopRecording()
      .then(async (result) =>{
        this.isRecording = false;

        if(result.value && result.value.recordDataBase64){
          this.recordedFileBase64 = result.value.recordDataBase64;

          const recordData = result.value.recordDataBase64;

          this.previousDescription = this.formControls['description']?.value;
          this.newReminderForm.removeControl('description');
        }
      });
  }

  startRecording(){
    if(this.isRecording){
      return;
    }

    this.isRecording = true;
    this.recordDuration = 0;
    this.recordDurationDisplay = '';
    VoiceRecorder.startRecording();
  }

  calculateRecordDuration(){
    if(!this.isRecording){
      return;
    }

    this.recordDuration += 0.01;
    const minutes = Math.floor(this.recordDuration / 60);
    const seconds = Math.floor(this.recordDuration % 60).toString().padStart(2, '0');
    this.recordDurationDisplay = `${minutes}:${seconds}`;

    if(this.recordDuration > MAX_RECORDING_TIME){
      this.stopRecording();
      this.screenService.presentWarningToast('Vous avez atteint la durée maximale d\'enregistrement !');
    }

    setTimeout(() =>{
      this.calculateRecordDuration();
    }, 10);
  }

  calculatePlayDuration(){
    if(!this.isPlayingAudio){
      return;
    }

    const minutes = Math.floor((this.audioRef?.currentTime ?? 0) / 60);
    const seconds = Math.floor((this.audioRef?.currentTime ?? 0) % 60).toString().padStart(2, '0');
    this.playDurationDisplay = `${minutes}:${seconds}`;
    this.playDurationPercentage = (((this.audioRef?.currentTime ?? 0) / (this.recordDuration ?? 1)) * 100);

    setTimeout(() =>{
      this.calculatePlayDuration();
    }, 10);
  }

  startPlayingRecordedAudio(){
    if(!this.recordedFileBase64 || (this.recordedFileBase64 && this.isPlayingAudio)){
      return;
    }

    if(this.isPlayingAudio === null) {
      this.isPlayingAudio = true;
      this.calculatePlayDuration();
      this.audioRef = new Audio(`data:audio/aac;base64,${this.recordedFileBase64}`);
      this.audioRef.onended = () =>{
        this.stopPlayingRecordedAudio();
      }
      this.audioRef.oncanplaythrough = () => this.audioRef?.play();
      this.audioRef.load();
    }
    else{
      this.isPlayingAudio = true;
      this.calculatePlayDuration();
      this.audioRef?.play();
    }

  }

  pausePlayingRecordedAudio(){
    if(!this.isPlayingAudio){
      return;
    }
    this.isPlayingAudio = false;
    this.audioRef?.pause();
  }

  stopPlayingRecordedAudio(){
    this.isPlayingAudio = null;
    this.playDurationDisplay = '';
    this.playDurationPercentage = 0;
  }

  deleteRecordedFile(){
    this.screenService.presentAlert({
      mode: "ios",
      message: "Voulez-vous retirer cet enregistrement ?",
      buttons: [
        {
          text: 'Non',
          role: 'cancel'
        },
        {
          text: 'Oui',
          handler: () =>{
            this.stopPlayingRecordedAudio();
            this.audioRef = undefined;
            this.recordedFileBase64 = null;
            this.newReminderForm.addControl('description', new FormControl(this.previousDescription, Validators.compose([Validators.required])))
          }
        }
      ]
    });
  }

  onFormSubmit(){
    this.formIsSubmitted = true;

    if(!this.newReminderForm.valid){
      this.screenService.presentErrorToast('Formulaire invalide !');
    }
    else{
      this.isProcessing = true;
      const data: Reminder = {
        categories: this.chooseCategories.length > 0 ? this.chooseCategories : [ReminderCategories.OTHERS],
        date: new Date(this.formControls['date']?.value ?? 0).getTime(),
        description: this.recordedFileBase64 ?? this.formControls['description']?.value,
        isARecord: !!this.recordedFileBase64,
        priority: this.selectedPriority ?? ReminderPriorities.LOW,
        reminderTime: this.formControls['reminderTime']?.value,
        title: this.formControls['title']?.value,
        recordDuration: this.recordedFileBase64 ? this.recordDuration : undefined
      }

      this.reminderService.createNewReminder(data)
        .then((res) =>{
          this.notificationService.scheduleReminderNotification(res.reminder, res.userId);
          this.screenService.presentSuccessToast('Votre rappel a été créé avec succès !');
          this.router.navigate(['/app/reminders']);
        })
        .catch((err) =>{
          console.error(err);
          this.screenService.presentErrorToast('Une erreur s\'est produite lors de la création de votre rappel ! Veuillez réessayer !');
        })
        .finally(() =>{
          this.isProcessing = false;
        });
    }
  }
}
