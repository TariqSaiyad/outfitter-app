import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';



@Component({
  selector: 'app-outfit-item',
  templateUrl: './outfit-item.component.html',
  styleUrls: ['./outfit-item.component.scss'],
})

/**
 * This is the component for Item, which handles displaying a single item object.
 * The component is used in multiple places in the app, and allows for code reuse.
 */
export class OutfitItemComponent implements OnInit {

  item; // the item object.
  // below are fields for the item, used in displaying.
  name;
  clothingType;
  dressCode;
  color;
  category;
  picture;

  constructor(
    private popoverController: PopoverController,
    private params: NavParams
  ) { }

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

  }

  /**
  * This closes the popover.
  */
  async close() {
    const onClosedData: string = "All Done!";
    await this.popoverController.dismiss(onClosedData);
  }

}
