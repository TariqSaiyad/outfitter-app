import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ItemsPage } from './items.page';
import { ItemsResolver } from './items.resolver';
var routes = [
    {
        path: '',
        component: ItemsPage,
        resolve: {
            data: ItemsResolver
        }
    }
];
var ItemsPageModule = /** @class */ (function () {
    function ItemsPageModule() {
    }
    ItemsPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [ItemsPage],
            providers: [
                ItemsResolver
            ]
        })
    ], ItemsPageModule);
    return ItemsPageModule;
}());
export { ItemsPageModule };
//# sourceMappingURL=items.module.js.map