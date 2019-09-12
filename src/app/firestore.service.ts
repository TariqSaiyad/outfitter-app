import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import { AngularFireAuth } from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})

/**
 * This is the firebase service that allows the database manipulation. 
 * It handles creating and deleting items and outfits. This service can also
 * get individual items and outfits based on their ids.
 */
export class FirestoreService {

  private snapshotChangesSubscription: any;

  constructor(public afs: AngularFirestore, private afAuth: AngularFireAuth) { }

  /**
   * This function creates an item object in the database.
   * It takes in the object and adds it to the list of items 
   * that this user currently has.
   * @param value the item object to be created.
   */
  createItem(value) {
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      // items stored in people/{{id}}/items/
      this.afs.collection('people').doc(currentUser.uid).collection('items').add({
        itemId: value.itemId,
        name: value.name,
        category: value.category,
        color: value.color,
        dressCode: value.dressCode,
        picture: value.picture,
        clothingType: value.clothingType
      })
        .then(
          res => resolve(res),
          err => reject(err)
        )
    })
  }

  /**
   * This gets all the items that the current user has. 
   * It will return the observable that can be read from.
   */
  getItems() {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.user.subscribe(currentUser => {
        if (currentUser) {
          this.snapshotChangesSubscription = this.afs.collection('people').doc(currentUser.uid).collection('items').snapshotChanges();
          resolve(this.snapshotChangesSubscription);
        }
      })
    });
  }

  /**
   * This will search the firebase database for a particular item
   * and return it.
   * @param itemId The id of the item that should be returned
   */
  getItem(itemId) {
    let p = new Promise<any>((resolve, reject) => {
      this.afAuth.user.subscribe(currentUser => {
        if (currentUser) {
          this.snapshotChangesSubscription = this.afs.doc<any>('people/' + currentUser.uid + '/items/' + itemId).valueChanges()
            .subscribe(snapshots => {
              resolve(snapshots);
            }, err => {
              reject(err)
            })
        }
      })
    });
    return p;
  }

  /**
   * This deletes the item from the database.
   * @param itemId the item that needs to be deleted.
   */
  deleteItem(itemId) {
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      if (itemId) {
        this.afs.collection('people').doc(currentUser.uid).collection('items').doc(itemId).delete()
          .then(
            res => resolve(res),
            err => reject(err)
          )
      }

    })
  }

  /**
   * This creates an outfit and adds it to the database list for
   * the current user.
   * @param data The outfit object to be created
   */
  createOutfit(data) {
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      //need to extract the IDs from the items, instead of storing the items itself.
      //This will save space and processing time.
      let accessoriesID = [];
      let layersID = [];
      //get IDs of pants and shoes item
      let pantsID = data.pants.payload.doc.id;
      let shoesID = data.shoes.payload.doc.id;

      //add the IDs of all layers to this array
      for (let i = 0; i < data.layers.length; i++) {
        layersID.push(data.layers[i].payload.doc.id)
      }

      //add the IDs of all accessories to this array
      for (let i = 0; i < data.accessories.length; i++) {
        accessoriesID.push(data.accessories[i].payload.doc.id)
      }

      //outfits stores in people/{{id}}/outfits/
      this.afs.collection('people').doc(currentUser.uid).collection('outfits').add({
        outfitName: data.outfitName,
        accessories: accessoriesID,
        layers: layersID,
        pants: pantsID,
        shoes: shoesID
      })
        .then(
          res => resolve(res),
          err => reject(err)
        )
    })
  }

  /**
   * This returns the outfit object with the matching id
   * @param outfitID get the outfit with this id
   */
  getOutfit(outfitID) {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.user.subscribe(currentUser => {
        if (currentUser) {
          this.snapshotChangesSubscription = this.afs.doc<any>('people/' + currentUser.uid + '/outfits/' + outfitID).valueChanges()
            .subscribe(snapshots => {
              resolve(snapshots);
            }, err => {
              reject(err)
            })
        }
      })
    });
  }

  /**
   * This gets all the outfit objects that this user currently has
   * This will have to be parsed later.
   */
  getOutfits() {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.user.subscribe(currentUser => {
        if (currentUser) {
          this.snapshotChangesSubscription = this.afs.collection('people').doc(currentUser.uid).collection('outfits').snapshotChanges();
          resolve(this.snapshotChangesSubscription);
        }
      })
    });
  }

  /**
   * This deletes the outfit with the matching id from the database.
   * @param outfitID The outfit that needs to be deleted.
   */
  deleteOutfit(outfitID) {
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      if (outfitID) {
        this.afs.collection('people').doc(currentUser.uid).collection('outfits').doc(outfitID).delete()
          .then(
            res => resolve(res),
            err => reject(err)
          )
      }
    })
  }
}
