import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { FirestoreService } from '../firestore.service';
var OutfitsResolver = /** @class */ (function () {
    function OutfitsResolver(firestoreService) {
        this.firestoreService = firestoreService;
    }
    OutfitsResolver.prototype.resolve = function () {
        return this.firestoreService.getItems();
    };
    OutfitsResolver = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [FirestoreService])
    ], OutfitsResolver);
    return OutfitsResolver;
}());
export { OutfitsResolver };
//# sourceMappingURL=outfits.resolver.js.map