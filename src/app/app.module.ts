import {NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {HttpLoaderFactory, SharedModule} from "./helpers/shared.module";
import {HttpClient} from "@angular/common/http";
import {IonicStorageModule} from "@ionic/storage-angular";
// import {AngularFireModule} from "@angular/fire/compat";
// import {environment} from "../environments/environment";
// import {AngularFireAuthModule} from "@angular/fire/compat/auth";
// import {AngularFirestoreModule} from "@angular/fire/compat/firestore";
// import {AngularFireStorageModule} from "@angular/fire/compat/storage";
// import {AngularFireDatabaseModule} from "@angular/fire/compat/database";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      isolate : false
    }),
    SharedModule.forRoot(),
    IonicStorageModule.forRoot(),

    // AngularFireModule.initializeApp(environment.firebaseConfig),
    // AngularFireAuthModule,
    // AngularFirestoreModule,
    // AngularFireStorageModule,
    // AngularFireDatabaseModule,

  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
