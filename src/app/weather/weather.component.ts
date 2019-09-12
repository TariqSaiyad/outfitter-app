import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
})

/**
 * This component is for the weather. It will display the weather info,
 * as well as display recommended clothing items to wear for that weather.
 */
export class WeatherComponent implements OnInit {

  weatherObject; //weather object
  temp; //temperature
  items; //all items in the database
  filteredItems; //the filtered items based on weather info

  //the options for the sliding view.
  slideOpts = {
    slidesPerView: 1,
    speed: 100,
    loop: true,
    centeredSlides: true,
  };

  constructor(
    public toastController: ToastController,
    private popoverController: PopoverController,
    private params: NavParams) { }

  //on init, the component will get all data from the params.
  ngOnInit() {
    this.weatherObject = this.params.data.weatherObject;
    this.temp = this.params.data.temp;
    this.items = this.params.data.items;
    //show the initial toast with a helpful message.
    this.showInitToast();
    //this will apply the weather filter.
    this.filterItems();
  }

  /**
   * This will filter the items based on the weather. 
   */
  filterItems() {
    //constant values for determining the weather limits.
    const windSpeedMax = 20;
    const windSpeedMin = 10;
    // recommend warm clothes for temp< tempMin
    const tempMin = 11;
    // recommend neutral clothes for tempMin<temp<tempMid
    // if temp> tempMid, recommend cool clothing.
    const tempMid = 20;
    const coldWeather = ['snow', 'shower rain', 'rain', 'thunderstorm']

    //show warm clothes if:
    // windSpeed> windSpeedMax
    let highWinds = parseFloat(this.weatherObject.wind.speed) >= windSpeedMax;
    // temperature is lower than min
    let lowTemp = this.temp <= tempMin;
    //weather is one of the cold weather types
    let isColdWeather = coldWeather.includes(this.weatherObject.weather[0].description);

    //show neutral clothes if:
    //lower w  console.table(this.filteredItems);ind speeds
    let midWinds = parseFloat(this.weatherObject.wind.speed) < windSpeedMax &&
      parseFloat(this.weatherObject.wind.speed) >= windSpeedMin;
    // mild temperatures 
    let midTemp = this.temp > tempMin && this.temp < tempMid;

    //warm or weatherproof clothes
    if (highWinds || lowTemp || isColdWeather) {
      this.filteredItems = this.items.filter((location) => {
        return location.payload.doc.data().clothingType.toLowerCase().includes('warm') ||
          location.payload.doc.data().clothingType.toLowerCase().includes('weatherproof');
      });
    }
    //neutral clothes.
    else if (midWinds || midTemp) {
      this.filteredItems = this.items.filter((location) => {
        return location.payload.doc.data().clothingType.toLowerCase().includes('neutral')
      });
    }
    // cool clothes.
    else {
      this.filteredItems = this.items.filter((location) => {
        return location.payload.doc.data().clothingType.toLowerCase().includes('cool')
      });
    }

  }

  /**
   * This shoes the initial toast message with helpful hint for
   * first time users.
   */
  async showInitToast() {
    const toast = await this.toastController.create({
      header: 'Swipe to see more recommended items',
      position: 'top',
      color: 'dark',
      duration: 3000,
    });
    toast.present();
    return;
  }

  /**
   * This closes the popover.
   */
  async close() {
    const onClosedData: string = "All Done!";
    await this.popoverController.dismiss(onClosedData);
  }

}
