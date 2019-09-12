import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { FirestoreService } from '../firestore.service';
import { LoadingController } from '@ionic/angular';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
const { Camera } = Plugins;

import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.page.html',
  styleUrls: ['./add-item.page.scss'],

})

/**
 * This class is used to add a new item to the database. It handles the user input and 
 * allows the user to take a photo of the item. 
 */
export class AddItemPage implements OnInit {

  ngOnInit() {
  }

  //These are the lists used for the dropdown menus.
  categories = ["Shirts", "Pants", "Jackets", "Hoodies", "Shorts", "Accessories", "Shoes"];
  colors = ["red", "pink", "purple", "blue", "green", "yellow", "orange", "brown", "grey", "black", "white"];
  dressCode = ["Streetwear", "Casual", "Business Casual", "Formal"];
  clothingTypes = ["Warm", "Cool", "Neutral", "Weatherproof"];

  //These are the fields used to create an item.
  itemId: any
  nameInput: string;
  categoryInput: string;
  colorInput: string;
  clothingTypeInput: string;
  dressCodeInput: string;
  picture: string;

  constructor(
    public loadingController: LoadingController,
    private firestoreService: FirestoreService,
    private router: Router,
    public toastController: ToastController
  ) { }

  /**
   * This function opens the camera module and allows the user to take pictures.
   */
  async openCamera() {
    const image = await Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera
    })
    // save the picture info in this field to be stored in the database.
    this.picture = image.dataUrl;
  }


  /**
   * This function creates a new item using the form and adds the data to the firebase storage.
   */
  async addItem() {

    // generate a random ID for the item.
    this.itemId = Math.floor(Math.random() * 9999999);
    //If all fields have been entered, add data to firebase.
    if (this.dressCodeInput && this.nameInput && this.categoryInput && this.colorInput && this.picture && this.clothingTypeInput) {
      // create the item object here.
      let data = {
        itemId: this.itemId,
        name: this.nameInput,
        category: this.categoryInput,
        color: this.colorInput,
        dressCode: this.dressCodeInput,
        picture: this.picture,
        clothingType: this.clothingTypeInput
      }

      // use the firestore service to store the item in database.
      this.firestoreService.createItem(data)
        .then(
          async res => {
            //if successful, show the loading circle, and notify the user.
            this.presentLoading();
            //creates a toast to confirm item creation.
            const toast = await this.toastController.create({
              header: this.nameInput + ' has been added!',
              position: 'top',
              color: 'dark',
              duration: 2000,
            });
            toast.present();
            // reset the fields in the inputs.
            this.itemId = null;
            this.nameInput = null;
            this.categoryInput = null;
            this.colorInput = null;
            this.clothingTypeInput = null;
            this.dressCodeInput = null;
            this.picture = null;
            //go back to items page.
            this.router.navigateByUrl('/home/items');
          }
        )
    } else {
      //creates a toast to notify that item has not been created.
      const toast = await this.toastController.create({
        header: 'Item not created, some fields are empty!',
        position: 'top',
        color: 'dark',
        duration: 2000,
      });
      toast.present();
      return;
    }
  }

  /**
   * This displays a progress circle indicator to show loading processes.
   */
  async presentLoading() {
    const loading = await this.loadingController.create({
      showBackdrop: false,
      spinner: 'crescent',
      duration: 1500,
      translucent: false,
      cssClass: 'custom-class custom-loading',
    });
    return await loading.present();
  }



}
