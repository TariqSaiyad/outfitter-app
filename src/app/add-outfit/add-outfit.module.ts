import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ItemsResolver } from '../items/items.resolver';


import { IonicModule } from '@ionic/angular';

import { AddOutfitPage } from './add-outfit.page';

const routes: Routes = [
  {
    path: '',
    component: AddOutfitPage,
    resolve: {
      data: ItemsResolver
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AddOutfitPage],
  providers: [
    ItemsResolver
  ]
})
export class AddOutfitPageModule {}
