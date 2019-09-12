import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { OutfitsPage } from './outfits.page';
import { ItemsResolver } from '../items/items.resolver';
var routes = [
    {
        path: '',
        component: OutfitsPage,
        resolve: {
            data: ItemsResolver
        }
    }
];
var OutfitsPageModule = /** @class */ (function () {
    function OutfitsPageModule() {
    }
    OutfitsPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                ReactiveFormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [OutfitsPage],
            providers: [
                ItemsResolver
            ]
        })
    ], OutfitsPageModule);
    return OutfitsPageModule;
}());
export { OutfitsPageModule };
//# sourceMappingURL=outfits.module.js.map