import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Reminder, ReminderCategories, ReminderPriorities} from "../../models/Reminder";
import {getCategoryColor, getCategoryLabel, getPriorityColor, getPriorityLabel} from "../../helpers/functions.helpers";
import {SpeakerService} from "../../services/speaker.service";
import {ScreenService} from "../../services/screen.service";

@Component({
  selector: 'app-reminder-details',
  templateUrl: './reminder-details.component.html',
  styleUrls: ['./reminder-details.component.scss'],
})
export class ReminderDetailsComponent implements OnInit {

  @Input() isOpen: boolean = false;
  @Input() reminder!: Reminder;
  @Output('onClose') closeModalEvent: EventEmitter<any> = new EventEmitter();

  audioRef !: HTMLAudioElement | undefined;
  isPlayingAudio: boolean | null = null;
  descriptionDuration: number = 0;
  playDurationDisplay: string = '';
  playDurationPercentage: number = 0;

  constructor(private speakerService: SpeakerService, private screenService: ScreenService) { }

  getCategoryColor(category: any){
    return getCategoryColor(category);
  }
  getCategoryLabel(category: any){
    return getCategoryLabel(category);
  }

  getPriorityColor(priority: any){
    return getPriorityColor(priority);
  }
  getPriorityLabel(priority: any){
    return getPriorityLabel(priority);
  }

  ngOnInit() {}

  onModalClose(){
    this.closeModalEvent.emit();
  }

  calculatePlayDuration(){
    if(!this.isPlayingAudio){
      return;
    }

    const minutes = Math.floor((this.audioRef?.currentTime ?? 0) / 60);
    const seconds = Math.floor((this.audioRef?.currentTime ?? 0) % 60).toString().padStart(2, '0');
    this.playDurationDisplay = `${minutes}:${seconds}`;
    this.playDurationPercentage = (((this.audioRef?.currentTime ?? 0) / (this.reminder.recordDuration ?? 1)) * 100);

    setTimeout(() =>{
      this.calculatePlayDuration();
    }, 10);
  }

  startPlayingDescriptionAudio(){
    console.log(this.reminder);
    if((!this.reminder?.isARecord) || (this.reminder?.isARecord && !!this.isPlayingAudio)){
      return;
    }
    if(this.isPlayingAudio === null) {
      this.isPlayingAudio = true;
      this.descriptionDuration = this.reminder?.recordDuration ?? 0;
      this.calculatePlayDuration();
      this.audioRef = new Audio(`data:audio/aac;base64,${this.reminder?.description}`);
      this.audioRef.onended = () =>{
        this.stopPlayingDescriptionAudio();
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

  pausePlayingDescriptionAudio(){
    if(!this.isPlayingAudio){
      return;
    }
    this.isPlayingAudio = false;
    this.audioRef?.pause();
  }

  stopPlayingDescriptionAudio(){
    this.isPlayingAudio = null;
    this.playDurationDisplay = '';
    this.playDurationPercentage = 0;
  }

  readText(description: string){
    this.speakerService.speak(description)
      .then((res) =>{})
      .catch((err) =>{
        this.screenService.presentErrorToast('Impossible de lire le message');
      });
  }

}
