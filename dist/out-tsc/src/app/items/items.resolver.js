import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { FirestoreService } from '../firestore.service';
var ItemsResolver = /** @class */ (function () {
    function ItemsResolver(firestoreService) {
        this.firestoreService = firestoreService;
    }
    ItemsResolver.prototype.resolve = function () {
        return this.firestoreService.getItems();
    };
    ItemsResolver = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [FirestoreService])
    ], ItemsResolver);
    return ItemsResolver;
}());
export { ItemsResolver };
//# sourceMappingURL=items.resolver.js.map