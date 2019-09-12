import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SearchItemsPage } from './search-items.page';
import { ItemsResolver } from '../items/items.resolver';
import { AddItemPage } from '../add-item/add-item.page';


const routes: Routes = [
  {
    path: '',
    component: SearchItemsPage,
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
  declarations: [SearchItemsPage],
  providers: [
    ItemsResolver,
    AddItemPage
  ]
})
export class SearchItemsPageModule {}
