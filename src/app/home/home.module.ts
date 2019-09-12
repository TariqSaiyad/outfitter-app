import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { HomePage } from './home.page';
import { FirebaseUIModule } from 'firebaseui-angular';
import { HomePageRoutingModule } from './home-routing.module';


@NgModule({
  imports: [
    FirebaseUIModule,
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    // RouterModule.forChild([
    //   {
    //     path: '',
    //     component: HomePage
    //   }
    // ])
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
