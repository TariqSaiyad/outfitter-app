import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  { path: '', loadChildren: './home/home.module#HomePageModule' },
  { path: 'add-item', loadChildren: './add-item/add-item.module#AddItemPageModule' },
  { path: 'items', loadChildren: './items/items.module#ItemsPageModule' },
  { path: 'outfits', loadChildren: './outfits/outfits.module#OutfitsPageModule' },
  { path: 'search-items', loadChildren: './search-items/search-items.module#SearchItemsPageModule' },
  // { path: 'outfit', loadChildren: './outfit/outfit.module#OutfitPageModule' },
  { path: 'add-outfit', loadChildren: './add-outfit/add-outfit.module#AddOutfitPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
