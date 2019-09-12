// import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { NavParams, AlertController } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';
import { FirestoreService } from '../firestore.service';
import { ActivatedRoute, Router } from '@angular/router';
var ItemComponent = /** @class */ (function () {
    function ItemComponent(route, router, firebaseService, alertCtrl, popoverController, params) {
        this.route = route;
        this.router = router;
        this.firebaseService = firebaseService;
        this.alertCtrl = alertCtrl;
        this.popoverController = popoverController;
        this.params = params;
    }
    ItemComponent.prototype.ngOnInit = function () {
        this.item = this.params.data.item;
        this.picture = this.item.payload.doc.data().picture;
        this.clothingType = this.item.payload.doc.data().clothingType;
        this.category = this.item.payload.doc.data().category;
        this.color = this.item.payload.doc.data().color;
        this.dressCode = this.item.payload.doc.data().dressCode;
        this.name = this.item.payload.doc.data().name;
        this.selected = this.params.data.selectedMenu;
    };
    ItemComponent.prototype.close = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var onClosedData;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        onClosedData = "All Done!";
                        return [4 /*yield*/, this.popoverController.dismiss(onClosedData)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ItemComponent.prototype.delete = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertCtrl.create({
                            header: 'Confirm',
                            message: 'Do you want to delete ' + this.item.name + '?',
                            buttons: [
                                {
                                    text: 'No',
                                    role: 'cancel',
                                    cssClass: 'secondary',
                                    handler: function () { }
                                },
                                {
                                    text: 'Yes',
                                    handler: function () {
                                        console.log(_this.item.payload.doc.id);
                                        _this.firebaseService.deleteItem(_this.item.payload.doc.id)
                                            .then(function (res) {
                                            _this.close();
                                            _this.selected = null;
                                            _this.router.navigateByUrl('/home/items');
                                            location.reload();
                                        }, function (err) { return console.log(err); });
                                    }
                                }
                            ]
                        })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ItemComponent = tslib_1.__decorate([
        Component({
            selector: 'app-item',
            templateUrl: './item.component.html',
            styleUrls: ['./item.component.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [ActivatedRoute,
            Router,
            FirestoreService, AlertController, PopoverController, NavParams])
    ], ItemComponent);
    return ItemComponent;
}());
export { ItemComponent };
//# sourceMappingURL=item.component.js.map