import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { FirestoreService } from '../firestore.service';
import { ActionSheetController } from '@ionic/angular';
import { PopoverController, AlertController } from '@ionic/angular';
import { OutfitItemComponent } from '../outfit-item/outfit-item.component';
import { LoadingController } from '@ionic/angular';

import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

@Component({
  selector: 'app-add-outfit',
  templateUrl: './add-outfit.page.html',
  styleUrls: ['./add-outfit.page.scss'],
})

/**
 * This class handles the creation of a new outfit. The user would look at the items 
 * of a category and add it to the outfit. When saved, the app will store the item id 
 * reference in the outfit object, and the app will parse these in the outfits page
 * to display them. This is done to avoid duplicate item object references.
 */
export class AddOutfitPage implements OnInit {

  //Field used to create an outfit.
  outfitName: string;
  layers = []; //can have multiple layers of shirts/hoodies/jackets
  accessories = []; //can have multiple accessories
  pants: any; //either pants or shorts
  shoes: any;
  items: Array<any>; // list of all the items 
  filteredItems: Array<any>; // filtered list depending on which category the user is looking at.
  selectedOption: any;
  maxAccessories = 2; //max number of accessories.
  maxLayers = 3; //max number of layers


  constructor(
    public loadingController: LoadingController,
    private alertCtrl: AlertController,
    public popoverController: PopoverController,
    public actionSheetController: ActionSheetController,
    private firestoreService: FirestoreService,
    private router: Router,
    public toastController: ToastController,
    private route: ActivatedRoute,
  ) { }


  /**
   * On init, the page will load all the items so that they can be accessed.
   */
  ngOnInit() {
    if (this.route && this.route.data) {
      this.getData();
    }
  }

  /**
   * This will resolve the item objects from the firebase database.
   */
  async getData() {
    this.route.data.subscribe(routeData => {
      routeData['data'].subscribe(data => {
        this.items = data;
        console.log(this.items);
      })
    })
  }

  /**
   * This function will filter the items based on the user's selected category.
   * This list will then be used to show the user all the items in that category,
   * from which they can choose an item to add to the outfit.
   * @param selected this is the category selected by the user.
   */
  setSelected(selected) {
    //empty the previous filtered array.
    this.filteredItems = [];
    //set the new selected category.
    this.selectedOption = selected;
    console.log(selected);

    //go through all items, and filter the ones based on this menu.
    if (selected == 'shoes') {
      this.filteredItems = this.items.filter((item) => {
        return item.payload.doc.data().category.toLowerCase().includes('shoes'.toLowerCase());
      });
    } else if (selected == 'layers') {
      this.filteredItems = this.items.filter((item) => {
        return item.payload.doc.data().category.toLowerCase().includes('hoodies'.toLowerCase()) ||
          item.payload.doc.data().category.toLowerCase().includes('shirts'.toLowerCase()) ||
          item.payload.doc.data().category.toLowerCase().includes('jackets'.toLowerCase());
      });
    } else if (selected == 'pants') {
      this.filteredItems = this.items.filter((item) => {
        return item.payload.doc.data().category.toLowerCase().includes('shorts'.toLowerCase()) ||
          item.payload.doc.data().category.toLowerCase().includes('pants'.toLowerCase());
      });
    } else if (selected == 'accessories') {
      this.filteredItems = this.items.filter((item) => {
        return item.payload.doc.data().category.toLowerCase().includes('accessories'.toLowerCase());
      });
    }
  }

  /**
   * This sets the selected category to null, which results in the screen going back to the menu.
   */
  goBack() {
    this.selectedOption = null;
  }

  /**
   * This will open an action sheet menu, displaying the multiple options the user has
   * while making an outfit.
   */
  async openMenu() {
    // create the action sheet here.
    const actionSheet = await this.actionSheetController.create({
      // below are the different types of items that can be added to an outfit.
      header: 'Add items to outfit',
      buttons: [{
        text: 'Accessories',
        handler: () => {
          this.addAccessories();
        }
      }, {
        text: 'Layers',
        handler: () => {
          this.addLayers();
        }
      }, {
        text: 'Pants',
        handler: () => {
          this.addPants();
        }
      }, {
        text: 'Shoes',
        handler: () => {
          this.addShoes();
        }
      }, {
        // save the outfit here.
        text: 'Save Outfit',
        icon: 'checkmark-circle',
        handler: () => {
          //if some items are missing, then do not create item.
          if (this.layers.length == 0 || this.accessories.length == 0 || this.pants == null || this.shoes == null) {
            // if some items are not added then do not make a new outfit
            this.presentToast('Outfit not created, some fields are empty!');
          } else {
            // else save the outfit.
            this.saveOutfit();
          }
        }
      }]
    });
    actionSheet.present();
  }

  /**
   * This checks if a shoe has already been added, and sets the selected field 
   * as 'shoes'
   */
  addShoes() {
    if (this.shoes) {
      // can't have more than one shoes item.
      this.presentToast('You have already added shoes');
      return;
    }
    // set selected.
    this.setSelected('shoes');
  }

  /**
   * This sets the selected category as the layers.
   */
  addLayers() {
    //if the max number of layers are added then show toast.
    if (this.layers.length == this.maxLayers) {
      this.presentToast('You have reached the maximum amount of layers');
      return;
    }
    this.setSelected('layers');
  }

  /**
  * This sets the selected category as 'pants'.
  */
  addPants() {
    //checks if pants already added
    if (this.pants) {
      this.presentToast('You have already added pants');
      return;
    }
    this.setSelected('pants');

  }

  /**
  * This sets the selected category as the accessories.
  */
  addAccessories() {
    // if max accessories are added then show toast.
    if (this.accessories.length == this.maxAccessories) {
      this.presentToast('You have reached the maximum amount of accessories');
      return;
    }
    this.setSelected('accessories');

  }

  /**
   * This saves the outfit after asking the user for the outfit.
   */
  async saveOutfit() {
    //create alert to show the options
    const alert = await this.alertCtrl.create({
      header: 'Confirm Save Outfit',
      // create the input option for the name.
      inputs: [
        {
          name: 'outfitName',
          type: 'text',
          placeholder: 'Outfit Name'
        }
      ],
      // cancel button will close the alert
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          // save the outfit
          text: 'Save',
          handler: data => {
            // this gets the data value from the input, and set it 
            // to the field.
            this.outfitName = data.outfitName;
            //create the outfit object.
            let toSend = {
              outfitName: this.outfitName,
              accessories: this.accessories,
              layers: this.layers,
              pants: this.pants,
              shoes: this.shoes
            }
            // senf the object to firebase service.
            this.firestoreService.createOutfit(toSend)
              .then(
                async res => {
                  //if successful, show loading and confirmation.
                  this.presentLoading();
                  //creates a toast to confirm item creation.
                  const toast = await this.toastController.create({
                    header: this.outfitName + ' has been added!',
                    position: 'top',
                    color: 'dark',
                    duration: 2000,
                  });
                  toast.present();
                  //go back to items page.
                  this.router.navigateByUrl('/home/items');
                }
              )
          }
        }
      ]
    });
    await alert.present();
  }

  /**
   * This shows the progress loading circle.
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

  /**
   * This shows a toast at the top of the screen to notify the user of 
   * actions.
   * @param msg is the message that should be displayed in the toast.
   */
  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      position: 'top',
      color: 'dark',
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  /**
   * This opens a popover that uses the Item component to display
   * the selected item. This is called when the user clicks on an
   * item card.
   * @param item the item that needs to be shown in the popover
   * @param ev event that occured at click
   */
  async showPopover(item, ev: any) {
    const popover = await this.popoverController.create({
      component: OutfitItemComponent,
      //this sends the item object as the parameter.
      componentProps: { "item": item, "fromOutfit": false },
      event: ev,
      animated: true,
      translucent: false,
      cssClass: 'pop-over-style'
    });
    return await popover.present();
  }

  /**
   * This is called when the user clicks on an item card, while
   * looking at items to add. This will add the respective item
   * to the field
   * @param item the item to be added to the field
   */
  async selectItem(item) {
    //check what category the item is in.
    // set the field/ add to list 
    if (this.selectedOption == 'shoes') {
      this.shoes = item;
    } else if (this.selectedOption == 'layers') {
      this.layers.push(item);
    } else if (this.selectedOption == 'pants') {
      this.pants = item;
    } else if (this.selectedOption == 'accessories') {
      this.accessories.push(item);
    }
    // this will go back to the outfit creation page.
    this.goBack();
  }
}
