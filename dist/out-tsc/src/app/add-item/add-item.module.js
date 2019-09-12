import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AddItemPage } from './add-item.page';
var routes = [
    {
        path: '',
        component: AddItemPage
    }
];
var AddItemPageModule = /** @class */ (function () {
    function AddItemPageModule() {
    }
    AddItemPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [AddItemPage]
        })
    ], AddItemPageModule);
    return AddItemPageModule;
}());
export { AddItemPageModule };
//# sourceMappingURL=add-item.module.js.map