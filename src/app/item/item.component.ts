import { Component, OnInit } from '@angular/core';
import { NavParams, AlertController } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';
import { FirestoreService } from '../firestore.service';
import { LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})

/**
 * This is the component for Item, which handles displaying a single item object.
 * The component is used in multiple places in the app, and allows for code reuse.
 */
export class ItemComponent implements OnInit {

  item; // the item object.
  fromOutfit: boolean; //this is true if the component is opened from the outfit page.
  // below are fields for the item, used in displaying.
  name;
  clothingType;
  dressCode;
  color;
  category;
  picture;

  constructor(
    public loadingController: LoadingController,
    private firebaseService: FirestoreService,
    private alertCtrl: AlertController,
    private popoverController: PopoverController,
    private params: NavParams) { }

  /**
   * on init, the component will get all the data from the 
   * parameters and save it in the fields for later use.
   */
  ngOnInit() {
    this.item = this.params.data.item;
    this.picture = this.item.payload.doc.data().picture;
    this.clothingType = this.item.payload.doc.data().clothingType;
    this.category = this.item.payload.doc.data().category;
    this.color = this.item.payload.doc.data().color;
    this.dressCode = this.item.payload.doc.data().dressCode;
    this.name = this.item.payload.doc.data().name;
    this.fromOutfit = this.params.data.fromOutfit;

  }

  /**
   * This closes the popover.
   */
  async close() {
    const onClosedData: string = "All Done!";
    await this.popoverController.dismiss(onClosedData);
  }

  /**
   * This will delete the item from the database. Deletion can only happen 
   * when the item popover is opened from a non-outfit page.
   */
  async delete() {
    const alert = await this.alertCtrl.create({
      header: 'Confirm',
      message: 'Do you want to delete ' + this.name + '?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => { }
        },
        {
          text: 'Yes',
          handler: () => {
            // if user confirms deletion, then send the item id to firebase 
            // service.
            console.log(this.item.payload.doc.id);
            this.firebaseService.deleteItem(this.item.payload.doc.id)
              .then(
                res => {
                  this.presentLoading().then(res => {
                    //after deleting, close the popover, and reload page.
                    this.close();
                    location.reload();
                  });
                },
                err => console.log(err)
              )
          }
        }
      ]
    });
    await alert.present();
  }

  /**
   * Show loading when item is deleted.
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
