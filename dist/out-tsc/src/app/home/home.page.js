import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ToastController, PopoverController } from '@ionic/angular';
var HomePage = /** @class */ (function () {
    function HomePage(popoverController, toastController, router, afAuth) {
        this.popoverController = popoverController;
        this.toastController = toastController;
        this.router = router;
        this.afAuth = afAuth;
    }
    HomePage.prototype.loginToast = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var toast;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastController.create({
                            header: 'You have successfully logged in, ' + this.afAuth.auth.currentUser.displayName,
                            position: 'top',
                            color: 'dark',
                            duration: 2000,
                        })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    HomePage.prototype.successCallback = function (signInSuccessData) {
        //go to items page by default
        this.router.navigateByUrl('/home/items');
        this.loginToast();
    };
    HomePage.prototype.signOut = function () {
        this.afAuth.auth;
        this.afAuth.auth.signOut().then(function () {
            // this.router.navigateByUrl('/home'); 
            location.reload();
        });
    };
    HomePage = tslib_1.__decorate([
        Component({
            selector: 'app-home',
            templateUrl: 'home.page.html',
            styleUrls: ['home.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [PopoverController, ToastController, Router, AngularFireAuth])
    ], HomePage);
    return HomePage;
}());
export { HomePage };
//# sourceMappingURL=home.page.js.map