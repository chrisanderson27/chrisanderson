import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  data;
  apiKey = '&units=imperial&appid=8207e11f4329e85d03fa5d3bd7c9f606';
  zipBase = 'https://api.openweathermap.org/data/2.5/weather?zip=';
  cityBase = 'https://api.openweathermap.org/data/2.5/weather?q=';
  fiveDayForcastBase = 'https://api.openweathermap.org/data/2.5/forecast?id=';
  myWeather;
  forecast;

  // goodData;
  constructor(private http: HttpClient) { }

  getByName(name: string): any {
    this.http.get(this.cityBase + name + this.apiKey).subscribe(res => {
      this.myWeather = (res);
      // this.parseObject(this.myWeather);
      console.log(':(' + JSON.stringify(this.myWeather));
      console.log(':)' + (this.myWeather.main));
    });
    // this.getForecast();

    return this.myWeather;

  }

  getByZip(zip: string): any {

    return this.http.get(this.zipBase + zip + ',us' + this.apiKey);

  }

   getForecast() {
    // return this.http.get(this.fiveDayForcastBase + this.myWeather.id + this.apiKey);
    return this.http.get(this.fiveDayForcastBase + this.myWeather.id + this.apiKey);
    // return (this.forecast.list);
  }

  getImage(main: string): string {
    switch (main) {
      case 'Clear':
        return 'https://openclipart.org/download/170678/sunny.svg';
      case 'Rain':
        return 'https://openclipart.org/download/170675/showers.svg';
      case 'Clouds':
        return 'https://openclipart.org/download/170679/sunny-to-cloudy.svg';
      case 'Snow':
        return 'https://openclipart.org/download/218651/weather-heavy-snow.svg';
      default:
        return 'https://openclipart.org/download/170678/sunny.svg';
    }
  }

  parseObject(obj) {
    console.log('parse!');
    for (const key of obj) {
      console.log('key: ' + key + ', value: ' + obj[key]);
      if (obj[key] instanceof Object) {
        this.parseObject(obj[key]);
      }
    }
  }
}
