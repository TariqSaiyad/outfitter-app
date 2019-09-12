import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router, ActivatedRoute } from '@angular/router';
var OutfitsPage = /** @class */ (function () {
    function OutfitsPage(router, route, afAuth) {
        this.router = router;
        this.route = route;
        this.afAuth = afAuth;
    }
    OutfitsPage.prototype.signOut = function () {
        this.afAuth.auth;
        this.afAuth.auth.signOut().then(function () {
            location.reload();
        });
    };
    OutfitsPage.prototype.ngOnInit = function () {
        if (this.route && this.route.data) {
            this.getData();
        }
    };
    OutfitsPage.prototype.getData = function () {
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
    OutfitsPage = tslib_1.__decorate([
        Component({
            selector: 'app-outfits',
            templateUrl: './outfits.page.html',
            styleUrls: ['./outfits.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Router,
            ActivatedRoute,
            AngularFireAuth])
    ], OutfitsPage);
    return OutfitsPage;
}());
export { OutfitsPage };
//# sourceMappingURL=outfits.page.js.map