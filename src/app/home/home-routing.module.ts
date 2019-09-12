import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: 'home',
    component: HomePage,
    children:[
        { path: 'items', loadChildren: '../items/items.module#ItemsPageModule' },
        { path: 'outfits', loadChildren:'../outfits/outfits.module#OutfitsPageModule' },
    ]
  },
  {
    path:'',
    redirectTo:'/home/items',
    pathMatch:'full'
  }
];

@NgModule({
  imports:
    [
      RouterModule.forChild(routes)
    ],
  exports:
    [
      RouterModule
    ]
})
export class HomePageRoutingModule {}