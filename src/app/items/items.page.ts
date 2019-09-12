import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { PopoverController } from '@ionic/angular';
import { ItemComponent } from '../item/item.component';
import { Observable } from 'rxjs';
import { WeatherService } from '../weather.service'
import { WeatherComponent } from '../weather/weather.component';

export interface IWindow extends Window {
  webkitSpeechRecognition: any;
}

@Component({
  selector: 'app-items',
  templateUrl: './items.page.html',
  styleUrls: ['./items.page.scss'],
})



/**
 * This is the items page, where the buttons for different categories are shown.
 * The page also consists of the search bar navigation and logout button.
 * When the user clicks on a category, then the page will display all items of the
 * respective category. The page also shows the weather and allows access to 
 * the recommended items page.
 */
export class ItemsPage implements OnInit {
  items: Array<any>; //all items in the database.
  filteredItems: Array<any>; //the items in the selected category.
  selectedMenu: string; // the selected category.
  currentPopover = null; // stores the popover for the item.
  weather: Observable<any>; // this is the weather info from the weather service.
  weatherObject; // this is the parsed weather object from the service.
  weatherIcon; // this is the icon for the weather type.
  temp; // this stores the formatted temperature value.


  webkitSpeechRecognition: IWindow = <IWindow>window;

  constructor(
    private weatherService: WeatherService,
    public popoverController: PopoverController,
    private router: Router,
    private route: ActivatedRoute,
    public afAuth: AngularFireAuth) {
  }

  //This signs out the user using the firebase auth service.
  signOut() {
    this.afAuth.auth
    this.afAuth.auth.signOut().then(() => {
      location.reload();
    });
  }

  // on init, the page will load all the item data from the database.
  async ngOnInit() {
    if (this.route && this.route.data) {
      await this.getData();
    }
  }

  /**
   * on enter, the speech recognition will turn on
   */
  ionViewWillEnter() {
    this.startSpeech();
  }

  /**
   * This is the speech recognition that uses webSpeech API.
   * NOTE: currently only supported in chrome
   */
  startSpeech() {

    var recognition = new this.webkitSpeechRecognition.webkitSpeechRecognition();
    recognition.onresult = event => {
      const terms = [];
      if (event.results) {
        console.log(event.results);
        for (const result of event.results) {
          for (const ra of result) {
            terms.push(ra.transcript);
          }
        }

        //if 'item' is detected
        if (terms.includes('item') || terms.includes('items') || terms.includes('add item') ||
          terms.includes('add items')) {
          this.router.navigateByUrl('/add-item');
        }
        //if 'outfit' is detected
        else if (terms.includes('outfit') || terms.includes('outfits') || terms.includes('add outfit') ||
          terms.includes('add outfits')) {
          this.router.navigateByUrl('/add-outfit');
        }
      }
    };

    recognition.start();
  }

  // this gets the data from the firebase service, and stores in the items list.
  // it also gets the weather information and parses it.
  async getData() {
    this.route.data.subscribe(routeData => {
      routeData['data'].subscribe(data => {
        this.items = data;
        console.log(this.items);
      })
    });
    //get the weather
    await this.getWeather().then(resolve => {
      // store weather object
      this.weatherObject = resolve;
      // format the temperature
      this.temp = Math.round(parseFloat(this.weatherObject.main.temp));
    });

  }

  /**
   * This gets the weather information from the service
   */
  getWeather() {
    var weatherPromise = new Promise<any>((resolve, reject) => {
      this.weatherService.getWeather().subscribe(val => {
        this.weather = val;
        resolve(this.weather);
      });
    })
    return weatherPromise;
  }

  /**
   * This sets the selected item category, and displays the items
   * in that category. 
   * @param selected the selected item category.
   */
  setSelected(selected) {
    //empty the previous filtered array.
    this.filteredItems = [];
    //set the new selected category.
    this.selectedMenu = selected;
    console.log(selected);
    //go through all items, and filter the ones based on this menu.
    for (var i of this.items) {
      //get current item.
      let itemCat = i.payload.doc.data().category;
      //add all the items that match the current one.
      if (itemCat == this.selectedMenu) {
        this.filteredItems.push(i);
      }
    }
    console.log(this.filteredItems);
  }

  /**
   * This sets the selected category to null, which results in the screen
   * going back to the menu.
   */
  backToItemsPage() {
    this.selectedMenu = null;
  }

  /**
   * This opens a popover showing the item that was clicked on.
   * @param item the item that is displayed in the popover
   * @param ev event that is triggered.
   */
  async showPopover(item, ev: any) {
    const popover = await this.popoverController.create({
      // use the itemComponent
      component: ItemComponent,
      //send the item as the parameter.
      componentProps: { "item": item, "fromOutfit": false },
      event: ev,
      animated: true,
      translucent: false,
      cssClass: 'pop-over-style'
    });
    return await popover.present();
  }

  /**
   * This is to close the current popover.
   */
  dismissPopover() {
    if (this.currentPopover) {
      this.currentPopover.dismiss().then(() => { this.currentPopover = null; });
    }
  }

  /**
   * This opens the weather popover, using the weather component.
   * That will contain the items that are recommended to the user.
   */
  async showWeatherPopover(ev: any) {
    const popover = await this.popoverController.create({
      //use weather component
      component: WeatherComponent,
      // send all items as parameter, the weather info and temperature
      componentProps: { "items": this.items, "weatherObject": this.weatherObject, "temp": this.temp },
      event: ev,
      animated: true,
      translucent: false,
      cssClass: 'pop-over-style'
    });
    return await popover.present();
  }




}
