import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage, SigninPage, NavMenuPage } from '../pages';
import { ComponentsModule } from '../components';
import { Camera } from '@ionic-native/camera';
import { IonicStorageModule } from '@ionic/storage';
import { CoreModule } from '../core';

const pages = [ MyApp, HomePage, SigninPage, NavMenuPage ];
@NgModule({
  declarations: [
    ...pages
  ],
  imports: [
    BrowserModule,
    ComponentsModule,
    CoreModule,
    IonicStorageModule.forRoot({
      name: '__users',
      driverOrder: ['indexeddb', 'sqlite', 'websql']
    }),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    ...pages
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
