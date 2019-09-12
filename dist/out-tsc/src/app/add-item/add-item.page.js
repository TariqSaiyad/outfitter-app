import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { FirestoreService } from '../firestore.service';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { DomSanitizer } from '@angular/platform-browser';
var Camera = Plugins.Camera;
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
var AddItemPage = /** @class */ (function () {
    function AddItemPage(firestoreService, sanitizer, router, toastController) {
        this.firestoreService = firestoreService;
        this.sanitizer = sanitizer;
        this.router = router;
        this.toastController = toastController;
        //These are the lists used for the dropdown menus.
        this.categories = ["Shirts", "Pants", "Jackets", "Hoodies", "Shorts", "Accessories", "Shoes"];
        this.colors = ["red", "pink", "purple", "blue", "green", "yellow", "orange", "brown", "grey", "black", "white"];
        this.dressCode = ["Streetwear", "Casual", "Business Casual", "Formal"];
        this.clothingTypes = ["Warm", "Cool", "Neutral", "Weatherproof"];
    }
    AddItemPage.prototype.ngOnInit = function () {
    };
    /**
     * This function opens the camera module and allows the user to take pictures.
     */
    AddItemPage.prototype.openCamera = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var image;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Camera.getPhoto({
                            quality: 100,
                            allowEditing: false,
                            resultType: CameraResultType.DataUrl,
                            source: CameraSource.Camera
                        })];
                    case 1:
                        image = _a.sent();
                        this.picture = image.dataUrl;
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * This function creates a new item using the form and adds the data to the firebase storage.
     */
    AddItemPage.prototype.addItem = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var data, toast;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.itemId = Math.floor(Math.random() * 9999999);
                        // console.log(this.picture);
                        console.log(this.itemId);
                        if (!(this.dressCodeInput && this.nameInput && this.categoryInput && this.colorInput && this.picture && this.clothingTypeInput)) return [3 /*break*/, 1];
                        data = {
                            itemId: this.itemId,
                            name: this.nameInput,
                            category: this.categoryInput,
                            color: this.colorInput,
                            dressCode: this.dressCodeInput,
                            picture: this.picture,
                            clothingType: this.clothingTypeInput
                        };
                        this.firestoreService.createItem(data)
                            .then(function (res) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                            var toast;
                            return tslib_1.__generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.toastController.create({
                                            header: this.nameInput + ' has been added!',
                                            position: 'top',
                                            color: 'dark',
                                            duration: 2000,
                                        })];
                                    case 1:
                                        toast = _a.sent();
                                        toast.present();
                                        //go back to items page.
                                        this.router.navigateByUrl('/home/items');
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, this.toastController.create({
                            header: 'Item not created, some fields are empty!',
                            position: 'top',
                            color: 'dark',
                            duration: 2000,
                        })];
                    case 2:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AddItemPage = tslib_1.__decorate([
        Component({
            selector: 'app-add-item',
            templateUrl: './add-item.page.html',
            styleUrls: ['./add-item.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [FirestoreService, DomSanitizer, Router, ToastController])
    ], AddItemPage);
    return AddItemPage;
}());
export { AddItemPage };
//# sourceMappingURL=add-item.page.js.map