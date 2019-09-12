import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import { AngularFireAuth } from '@angular/fire/auth';
var FirestoreService = /** @class */ (function () {
    function FirestoreService(afs, afAuth) {
        this.afs = afs;
        this.afAuth = afAuth;
    }
    FirestoreService.prototype.createItem = function (value) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var currentUser = firebase.auth().currentUser;
            _this.afs.collection('people').doc(currentUser.uid).collection('items').add({
                itemId: value.itemId,
                name: value.name,
                category: value.category,
                color: value.color,
                dressCode: value.dressCode,
                picture: value.picture,
                clothingType: value.clothingType
            })
                .then(function (res) { return resolve(res); }, function (err) { return reject(err); });
        });
    };
    FirestoreService.prototype.getItems = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.afAuth.user.subscribe(function (currentUser) {
                if (currentUser) {
                    _this.snapshotChangesSubscription = _this.afs.collection('people').doc(currentUser.uid).collection('items').snapshotChanges();
                    resolve(_this.snapshotChangesSubscription);
                }
            });
        });
    };
    FirestoreService.prototype.getItem = function (itemId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.afAuth.user.subscribe(function (currentUser) {
                if (currentUser) {
                    _this.snapshotChangesSubscription = _this.afs.doc('people/' + currentUser.uid + '/items/' + itemId).valueChanges()
                        .subscribe(function (snapshots) {
                        resolve(snapshots);
                    }, function (err) {
                        reject(err);
                    });
                }
            });
        });
    };
    FirestoreService.prototype.deleteItem = function (taskKey) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var currentUser = firebase.auth().currentUser;
            if (taskKey) {
                _this.afs.collection('people').doc(currentUser.uid).collection('items').doc(taskKey).delete()
                    .then(function (res) { return resolve(res); }, function (err) { return reject(err); });
            }
        });
    };
    FirestoreService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [AngularFirestore, AngularFireAuth])
    ], FirestoreService);
    return FirestoreService;
}());
export { FirestoreService };
//# sourceMappingURL=firestore.service.js.map