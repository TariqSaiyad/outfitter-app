import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { PopoverController } from '@ionic/angular';
import { ItemComponent } from '../item/item.component';
var ItemsPage = /** @class */ (function () {
    function ItemsPage(popoverController, router, route, afAuth) {
        this.popoverController = popoverController;
        this.router = router;
        this.route = route;
        this.afAuth = afAuth;
        this.currentPopover = null;
    }
    ItemsPage.prototype.signOut = function () {
        this.afAuth.auth;
        this.afAuth.auth.signOut().then(function () {
            location.reload();
        });
    };
    ItemsPage.prototype.ngOnInit = function () {
        if (this.route && this.route.data) {
            this.getData();
        }
    };
    ItemsPage.prototype.getData = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                this.route.data.subscribe(function (routeData) {
                    routeData['data'].subscribe(function (data) {
                        _this.items = data;
                        console.log(_this.items);
                    });
                });
                return [2 /*return*/];
            });
        });
    };
    ItemsPage.prototype.setSelected = function (selected) {
        //empty the previous filtered array.
        this.filteredItems = [];
        //set the new selected category.
        this.selectedMenu = selected;
        console.log(selected);
        //go through all items, and filter the ones based on this menu.
        for (var _i = 0, _a = this.items; _i < _a.length; _i++) {
            var i = _a[_i];
            //get current item.
            var itemCat = i.payload.doc.data().category;
            //add all the items that match the current one.
            if (itemCat == this.selectedMenu) {
                this.filteredItems.push(i);
            }
        }
        console.log(this.filteredItems);
    };
    /**
     * This sets the selected category to null, which results in the screen going back to the menu.
     */
    ItemsPage.prototype.backToItemsPage = function () {
        this.selectedMenu = null;
    };
    ItemsPage.prototype.showPopover = function (item, ev) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var popover;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.popoverController.create({
                            component: ItemComponent,
                            componentProps: { "item": item, "selectedMenu": this.selectedMenu },
                            event: ev,
                            animated: true,
                            translucent: false,
                            cssClass: 'pop-over-style'
                        })];
                    case 1:
                        popover = _a.sent();
                        return [4 /*yield*/, popover.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ItemsPage.prototype.dismissPopover = function () {
        var _this = this;
        if (this.currentPopover) {
            this.currentPopover.dismiss().then(function () { _this.currentPopover = null; });
        }
    };
    ItemsPage = tslib_1.__decorate([
        Component({
            selector: 'app-items',
            templateUrl: './items.page.html',
            styleUrls: ['./items.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [PopoverController, Router,
            ActivatedRoute, AngularFireAuth])
    ], ItemsPage);
    return ItemsPage;
}());
export { ItemsPage };
//# sourceMappingURL=items.page.js.map