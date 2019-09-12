import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  // the api key for the service
  apiKey = 'c92643262aeb6c6910e8f16e4a9f9e43';

  constructor(private http: HttpClient) { }

  /**
   * This gets the weather information from openWeatherMap.org
   * and returns the results. 
   */
  getWeather(): Observable<any> {
    return this.http.get('https://api.openweathermap.org/data/2.5/weather?q=Wellington,nzl&units=metric&appid=c92643262aeb6c6910e8f16e4a9f9e43')
      .pipe(
        map(results => {
          return results;
        })
      );
  }

}



