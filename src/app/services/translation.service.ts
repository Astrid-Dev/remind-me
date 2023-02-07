import { Injectable } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import { Preferences } from '@capacitor/preferences';

const LAGUAGE_KEY = "LANGUAGE";

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  private currentLang!: string;
  private languagesList = ["fr", "en"];

  constructor(private translate: TranslateService) {
    translate.addLangs(this.languagesList);
    Preferences.get({key: LAGUAGE_KEY})
      .then((lang) =>{
        if(lang.value && this.languagesList.includes(lang.value))
        {
          translate.setDefaultLang(lang.value);
          this.currentLang = lang.value;
        }
        else
        {
          const temp = translate.getBrowserLang();
          const lang = this.languagesList.includes(temp as string) ? temp : this.languagesList[0];
          translate.setDefaultLang(lang as string);
          this.currentLang = lang as string;
        }
      })
      .catch((err) =>{
        console.error(err);
        this.currentLang = this.languagesList[0];
        translate.setDefaultLang(this.currentLang);
      });
  }

  changeLanguage(newLang: string)
  {
    if(this.currentLang !== newLang && this.translate.getLangs().includes(newLang))
    {
      this.translate.use(newLang);
      this.currentLang = newLang;
      Preferences.set({key: LAGUAGE_KEY, value: newLang});
    }
  }

  getCurrentLang()
  {
    return this.currentLang;
  }

  getValueOf(key: string)
  {
    return this.translate.instant(key);
  }

}
