import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { FirebaseUIModule } from 'firebaseui-angular';
import { HomePageRoutingModule } from './home-routing.module';
var HomePageModule = /** @class */ (function () {
    function HomePageModule() {
    }
    HomePageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                FirebaseUIModule,
                CommonModule,
                FormsModule,
                IonicModule,
                HomePageRoutingModule,
            ],
            declarations: [HomePage]
        })
    ], HomePageModule);
    return HomePageModule;
}());
export { HomePageModule };
//# sourceMappingURL=home.module.js.map