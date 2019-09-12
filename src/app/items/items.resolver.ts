import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { FirestoreService } from '../firestore.service';

@Injectable()
export class ItemsResolver implements Resolve<any> {

  constructor(private firestoreService: FirestoreService) {}

  resolve() {
    return this.firestoreService.getItems();
  }
}