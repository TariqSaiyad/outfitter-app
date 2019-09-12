import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { AppComponent } from './app.component';
import { ItemComponent } from './item/item.component';
import { OutfitComponent } from './outfit/outfit.component';
import { OutfitItemComponent } from './/outfit-item/outfit-item.component';
import { WeatherComponent } from './weather/weather.component';

import { FirebaseUIModule } from 'firebaseui-angular';
import * as firebase from 'firebase/app';
import * as firebaseui from 'firebaseui';

import { environment } from 'src/environments/environment';
import { Camera } from '@ionic-native/camera/ngx';
import { CameraPreview } from '@ionic-native/camera-preview/ngx';

// This is used to set up the firebase login UI. Currently, 
// it only uses an email sign up system.
const firebaseUiAuthConfig: firebaseui.auth.Config = {
  signInFlow: 'redirect',
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID
  ],
  credentialHelper: firebaseui.auth.CredentialHelper.NONE
};

@NgModule({
  //declare the components used in the app.
  declarations: [AppComponent, ItemComponent, OutfitItemComponent, OutfitComponent, WeatherComponent],
  entryComponents: [ItemComponent, OutfitItemComponent, OutfitComponent, WeatherComponent],
  imports: [
    HttpClientModule,
    CommonModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore
    AngularFireAuthModule, // imports firebase/auth
    AngularFireStorageModule, // imports firebase/storage
    FirebaseUIModule.forRoot(firebaseUiAuthConfig),
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule],
  providers: [
    CameraPreview, // imports the camera modules.
    Camera,
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
