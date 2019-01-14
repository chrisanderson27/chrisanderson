import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { HttpClient } from '@angular/common/http';
import { WeatherObj } from './WeatherObj';
import { Router } from '@angular/router';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  data;
  myService;
  zip: number;
  city: string;
  id: string;
  myWeatherObj;
  forecast;
  amIHidden = true;
  // date: string = (new Date().toISOString.split('T')[0]); // toISOString().split('T')[0];
  test: string = '2018-12-04 21:00:00'.substring(0, 10);
  forecastDays: WeatherObj[];

  constructor(private http: HttpClient, private service: WeatherService, private router: Router) {
    this.myService = service;
    // this.date = (this.date);
  }

  ngOnInit() {
  }

  // get by...

  getByName() {
    this.amIHidden = false;
    // this.data = (this.service.getByName(name));
    this.data = this.myService.getByName(this.city);
    this.service.getForecast();
    console.log(this.data);

    this.myWeatherObj = new WeatherObj();
    this.myWeatherObj.title = (this.data).name;
    this.myWeatherObj.country = (this.data).sys.country;
    this.myWeatherObj.description = (this.data).weather[0].description;
    this.myWeatherObj.main = (this.data).weather[0].main;
    this.myWeatherObj.imageUrl = this.service.getImage(this.myWeatherObj.main);
    this.myWeatherObj.low = (this.data).main.temp_min;
    this.myWeatherObj.high = (this.data).main.temp_max;
    this.myWeatherObj.pressure = (this.data).main.pressure;
    this.myWeatherObj.humidity = (this.data).main.humidity;
    this.myWeatherObj.speed = (this.data).wind.speed;
  }

  getByZipController() {
    this.getByZip();
    // this.getByZip();
  }

  getByZip() {
    this.amIHidden = false;
    // this.data = (this.service.getByName(name));
    this.data = this.myService.getByZip(this.zip);
    this.service.getForecast();
    console.log(this.data);

    this.myWeatherObj = new WeatherObj();

    this.myWeatherObj.title = (this.data).name;
    this.myWeatherObj.country = (this.data).sys.country;
    this.myWeatherObj.description = (this.data).weather[0].description;
    this.myWeatherObj.main = (this.data).weather[0].main;
    this.myWeatherObj.imageUrl = this.service.getImage(this.myWeatherObj.main);
    this.myWeatherObj.low = (this.data).main.temp_min;
    this.myWeatherObj.high = (this.data).main.temp_max;
    this.myWeatherObj.pressure = (this.data).main.pressure;
    this.myWeatherObj.humidity = (this.data).main.humidity;
    this.myWeatherObj.speed = (this.data).wind.speed;
  }

  showFiveDay() {
    this.router.navigate(['/forecast']);
  }
}
