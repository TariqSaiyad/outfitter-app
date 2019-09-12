import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { ItemComponent } from '../item/item.component';
import { AddItemPage } from '../add-item/add-item.page';
@Component({
  selector: 'app-search-items',
  templateUrl: './search-items.page.html',
  styleUrls: ['./search-items.page.scss'],
})

/**
 * This is the search items page, where the user can filter, search for their items.
 * The page will filter the items based on the user's selected filters in real time.
 */
export class SearchItemsPage implements OnInit {

  items: Array<any>;// all the items in the database
  searchItems = []; // the filtered list of items.
  searchValue: string; // the search input string
  isSearch = false; // whether the user is using the search bar or not
  currentPopover = null; // the item popover.

  // below are the different fields accessed from the add_item page.
  // they contain the values that each of these fields can have.
  categories = this.addItemPage.categories;
  clothingTypes = this.addItemPage.clothingTypes;
  dressCode = this.addItemPage.dressCode;
  colors = this.addItemPage.colors;
  //these are the inputs that will be populated based on the users
  //choice
  categoryInput = "";
  colorInput = "";
  clothingTypeInput = "";
  dressCodeInput = "";

  constructor(public addItemPage: AddItemPage,
    public popoverController: PopoverController,
    private route: ActivatedRoute) { }

  /**
   * On init, this page will gather all the item objects,
   * and initialize the input values
   */
  ngOnInit() {

    if (this.route && this.route.data) {
      this.getData();
    }

    //this adds an empty option, incase the user wants 
    //to clear their search
    this.categories.push("");
    this.colors.push("");
    this.dressCode.push("");
    this.clothingTypes.push("");
  }

  /**
   * This gets the item objects from the firebase database.
   */
  async getData() {
    this.route.data.subscribe(routeData => {
      routeData['data'].subscribe(data => {
        this.items = data;
        console.log(this.items);
        this.searchItems = this.items;
      })
    })
  }

  /**
   * This will open a popover for any item that is selected,
   * using the item component.
   * @param item The item that needs to be displayed
   * @param ev the event that is triggered
   */
  async showPopover(item, ev: any) {
    const popover = await this.popoverController.create({
      component: ItemComponent,
      componentProps: { "item": item, "fromOutfit": false },
      event: ev,
      animated: true,
      translucent: false,
      cssClass: 'pop-over-style'
    });
    return await popover.present();
  }

  /**
   * This will close the popover
   */
  dismissPopover() {
    if (this.currentPopover) {
      this.currentPopover.dismiss().then(() => { this.currentPopover = null; });
    }
  }

  /**
   * This is for the searching of items using the item name.
   * It will filter the item list depending on user input in real time.
   */
  search() {
    //this is called on every change of the search bar.

    //if there are items in the list, do the following.
    if (this.items && this.items.length > 0) {
      //clear all filters, so only the name filter counts.
      this.clearFilters();
      //filter by name.
      this.searchItems = this.items.filter((location) => {
        return location.payload.doc.data().name.toLowerCase().includes(this.searchValue.toLowerCase());
      });
    }
  }

  /**
   * When the search input is cancelled, reset the name filter.
   */
  onSearchCancel() {
    this.searchValue = "";
    this.searchItems = [];
  }

  /**
   * This will filter the items based on their categories.
   * It applies all the filters at once, so users can have complex searches, such
   * as showing all items that are PANTS, and BLUE and WARM. etc.
   */
  filterResults() {
    //check that there are items to perform search on. 
    //this avoid any errors accessing a list that is undefined.
    if (this.items && this.items.length > 0) {
      //filter the items by the different categories. 
      // the filters are all '&&' together to compound searches.
      this.searchItems = this.items.filter((item) => {
        return item.payload.doc.data().category.toLowerCase().includes(this.categoryInput.toLowerCase()) &&
          item.payload.doc.data().color.toLowerCase().includes(this.colorInput.toLowerCase()) &&
          item.payload.doc.data().dressCode.toLowerCase().includes(this.dressCodeInput.toLowerCase()) &&
          item.payload.doc.data().clothingType.toLowerCase().includes(this.clothingTypeInput.toLowerCase())
      });
    }
  }

  /**
   * This will clear all filters and searches, and resets the search
   */
  clearFilters() {
    this.categoryInput = "";
    this.colorInput = "";
    this.clothingTypeInput = "";
    this.dressCodeInput = "";
    this.filterResults();
  }
}
