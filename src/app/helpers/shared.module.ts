import {CommonModule, LocationStrategy, PathLocationStrategy} from '@angular/common';
import {ModuleWithProviders, NgModule} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {ScreenService} from '../services/screen.service';
import {SwiperModule} from 'swiper/angular';
import {ReminderService} from "../services/reminder.service";
import {SettingsService} from "../services/settings.service";
import {SpeakerService} from "../services/speaker.service";
import {NotificationService} from "../services/notification.service";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      isolate: false
    }),
    SwiperModule
  ],
  declarations: [],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule,
    SwiperModule
  ],
  providers: []
})

export class SharedModule {
  static forRoot(): ModuleWithProviders<any> {
    return {
      ngModule: SharedModule,
      providers: [
        ScreenService,
        ReminderService,
        SettingsService,
        SpeakerService,
        NotificationService
      ]
    };
  }
}

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
