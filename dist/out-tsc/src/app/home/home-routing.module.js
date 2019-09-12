import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomePage } from './home.page';
var routes = [
    {
        path: 'home',
        component: HomePage,
        children: [
            { path: 'items', loadChildren: '../items/items.module#ItemsPageModule' },
            { path: 'outfits', loadChildren: '../outfits/outfits.module#OutfitsPageModule' },
        ]
    },
    {
        path: '',
        redirectTo: '/home/items',
        pathMatch: 'full'
    }
];
var HomePageRoutingModule = /** @class */ (function () {
    function HomePageRoutingModule() {
    }
    HomePageRoutingModule = tslib_1.__decorate([
        NgModule({
            imports: [
                RouterModule.forChild(routes)
            ],
            exports: [
                RouterModule
            ]
        })
    ], HomePageRoutingModule);
    return HomePageRoutingModule;
}());
export { HomePageRoutingModule };
//# sourceMappingURL=home-routing.module.js.map