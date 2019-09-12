import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { OutfitsPage } from './outfits.page';
import { ItemsResolver } from '../items/items.resolver';
import { OutfitsResolver } from './outfits.resolver';


const routes: Routes = [
  {
    path: '',
    component: OutfitsPage,
    resolve: {
      data: OutfitsResolver,
      items : ItemsResolver
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [OutfitsPage],
  providers: [
    ItemsResolver,
    OutfitsResolver
  ]
})
export class OutfitsPageModule {}
