import { Component, OnInit, NgZone } from '@angular/core';
import { NavParams, AlertController } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';
import { FirestoreService } from '../firestore.service';
import { ItemComponent } from '../item/item.component';

@Component({
  selector: 'app-outfit',
  templateUrl: './outfit.component.html',
  styleUrls: ['./outfit.component.scss'],
})

/**
 * This is the outfit component that is used to display an outfit
 * object. It contains the layers, accessories, pants and shoes items 
 * and displays them. The user can also delete them.
 */
export class OutfitComponent implements OnInit {

  outfit; // the outfit object
  //the fields that make up an outfit.
  outfitName;
  accessories = []
  layers = []
  pants;
  shoes;

  constructor(
    private firebaseService: FirestoreService,
    private alertCtrl: AlertController,
    private popoverController: PopoverController,
    private params: NavParams
  ) { }

  /**
   * On init, the component will load all the parameters into the
   * fields.
   */
  ngOnInit() {
    this.outfit = this.params.data.outfit;
    this.accessories = this.outfit.accessories;
    this.outfitName = this.outfit.outfitName;
    this.layers = this.outfit.layers;
    this.pants = this.outfit.pants;
    this.shoes = this.outfit.shoes;
  }

  /**
   * This will close the popover
   */
  async close() {
    const onClosedData: string = "All Done!";
    await this.popoverController.dismiss(onClosedData);
  }

  /**
   * This opens a popover when an item is clicked on.
   * This uses the item component.
   * @param item The item that needs to be displayed
   * @param ev event that is triggered
   */
  async showItemPopover(item, ev: any) {
    const popover = await this.popoverController.create({
      component: ItemComponent,
      componentProps: { "item": item, "fromOutfit": true },
      event: ev,
      animated: true,
      translucent: false,
      cssClass: 'pop-over-style'
    });
    return await popover.present();
  }

  /**
   * This is used to delete an item. The user can confirm deletion.
   */
  async deleteOutfit() {
    //this opens an alert to show the user options.
    const alert = await this.alertCtrl.create({
      header: 'Confirm',
      message: 'Do you want to delete ' + this.outfit.outfitName + '?',
      buttons: [
        {
          //cancel will close the alert.
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => { }
        },
        {
          // if confirmed the outfit will be deleted.
          text: 'Yes',
          handler: () => {
            console.log(this.outfit.id);
            //this sends the outfit id to firebase service.
            this.firebaseService.deleteOutfit(this.outfit.id)
              .then(
                res => {
                  //if successful, close popover and reload page.
                  this.close();
                  location.reload();
                },
                err => console.log(err)
              )
          }
        }
      ]
    });
    await alert.present();
  }

}
