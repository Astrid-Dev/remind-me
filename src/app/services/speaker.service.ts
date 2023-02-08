import { Injectable } from '@angular/core';
import {ScreenReader} from "@capacitor/screen-reader";

@Injectable({
  providedIn: 'root'
})
export class SpeakerService {

  constructor() { }

  async speak(text: string){
    return await ScreenReader.speak({
      value: text
    });
  }
}
