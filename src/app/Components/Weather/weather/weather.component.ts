import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { HttpClient } from '@angular/common/http';
import { WeatherObj } from './WeatherObj';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { SourceCodeViewComponent } from 'src/app/source-code-view/source-code-view.component';
import { ForecastModel } from './forecast/forecastModel';
import { CodegenComponentFactoryResolver } from '@angular/core/src/linker/component_factory_resolver';
import {code} from '../../../Models/SourceCode.model';
import { SourceCodeService } from 'src/app/Services/source-code.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  myForecastData;
  currentWeatherModel: ForecastModel;
  myForecastDataList: ForecastModel[] = [];
  currentGraphBtnName = 'Switch to bar graph';

  public lineChartData: Array<any> = [];
  public lineChartLabels: Array<any> = [];
  public lineChartType = 'line';
  public lineChartLegend = true;

  public lineChartOptions: any = {
    responsive: true
  };
  currentCityTitle = '';
  data;
  zip: number;
  city: string;
  id: string;
  myWeatherObj = new WeatherObj();
  forecast;
  amIHidden = true;
  // date: string = (new Date().toISOString.split('T')[0]); // toISOString().split('T')[0];
  test: string = '2018-12-04 21:00:00'.substring(0, 10);
  forecastDays: WeatherObj[];

  sourceCode = [
    ['weather.component.ts', code.Weather.ts],
    ['weather.component.html', code.Weather.html],
    ['weather.component.css', code.Weather.css],
    ['weather.service.ts', code.Weather.service],
    ['weather.ts', code.Weather.model]
  ];

  constructor(private http: HttpClient, 
    private service: WeatherService,
    private router: Router, private dialog: MatDialog,
    private sourceCodeService: SourceCodeService) {
      sourceCodeService.currentSourceCode = this.sourceCode;

    this.zip = 30303;
    this.getByZipController();
     // this.date = (this.date);
  }
  ngOnInit() {
    // this.zip = 30303;
    // this.getByZipController();
  }
  getByZipController() {
    this.getByZip();
  }

  getByZip() {
    this.amIHidden = false;
    // this.data = (this.service.getByName(name));
    this.service.getByZip(this.zip + '').subscribe(
      res => {
        this.data = (res);
        this.service.myWeather = this.data;
        // this.parseObject(this.myWeather);
        console.log('inside getByZip:(' + JSON.stringify(this.data));
        console.log(':)' + (this.data.main));

        this.service.getForecast().subscribe(newRes => {
          this.forecast = (newRes);
          this.service.forecast = this.forecast;
          // this.parseObject(this.myWeather);
          // console.log(':(' + this.myWeather);
          // console.log(':)' + (this.myWeather.main));
          console.log('forcast returned: ' + JSON.stringify(this.forecast.list));
          console.log('!!: ' + JSON.stringify(this.data.name));
          this.myWeatherObj = new WeatherObj();
          this.myWeatherObj.title = this.data.name;
          this.currentCityTitle = 'for ' + this.data.name;
          this.myWeatherObj.country = (this.data).sys.country;
          this.myWeatherObj.description = (this.data).weather[0].description;
          this.myWeatherObj.main = (this.data).weather[0].main;
          this.myWeatherObj.imageUrl = this.service.getImage(this.myWeatherObj.main);
          this.myWeatherObj.low = (this.data).main.temp_min;
          this.myWeatherObj.high = (this.data).main.temp_max;
          this.myWeatherObj.pressure = (this.data).main.pressure;
          this.myWeatherObj.humidity = (this.data).main.humidity;
          this.myWeatherObj.speed = (this.data).wind.speed;
          this.showFiveDay();
        });
      });
  }

  showFiveDay() {
    this.extractDetails();
  }
  // opens modal
  openDialog() {
    const dialogRef = this.dialog.open(SourceCodeViewComponent, {
      maxWidth: '100vw',
      width: '80%',
      maxHeight: '100vh',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  close() {
    this.dialog.closeAll();
    this.router.navigate(['/']);
  }



  public randomizeType(): void {
    this.lineChartType = this.lineChartType === 'line' ? 'bar' : 'line';
    this.currentGraphBtnName = this.lineChartType === 'line' ? 'Switch to bar graph' : 'Switch to line chart';
  }

  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  extractDetails() {
    this.myForecastDataList = [];
    let currentDate = new Date().toISOString().split('T')[0];
    // let currentDate = '';
    console.log(currentDate + '...' + this.service.forecast.cnt);
    // let index = 0;
    let currentMin = null;
    let currentMax = null;
    for (let index = 0; index < this.service.forecast.cnt; index++) {
      if (currentMin === null) {
        currentMin = this.service.forecast.list[index].main.temp_min;
        currentMax = this.service.forecast.list[index].main.temp_max;
      }
      // check if mins/maxes should be replaced

      if (this.service.forecast.list[index].main.temp_min < currentMin) {
        currentMin = this.service.forecast.list[index].main.temp_min;
        console.log('currentMin : ' + currentMin + ', serviceMin: ' + this.service.forecast.list[index].main.temp_min);
      }

      if (this.service.forecast.list[index].main.temp_max > currentMin) {
        currentMax = this.service.forecast.list[index].main.temp_max;
      }

      console.log(this.service.forecast.list[index]);
      // console.log('comparing: ' + this.service.forecast.list[index].dt_txt.substring(0, 10) + ' === ' + currentDate.substring(0, 10));
      if (this.service.forecast.list[index].dt_txt.substring(0, 10) === currentDate.substring(0, 10)) {
        // console.log('insideIf');
      } else {
        this.currentWeatherModel = new ForecastModel();
        this.currentWeatherModel.title = (this.service.myWeather).name;
        this.currentWeatherModel.country = (this.service.myWeather).sys.country;
        this.currentWeatherModel.description = this.service.forecast.list[index].weather[0].description;
        this.currentWeatherModel.main = this.service.forecast.list[index].weather[0].main;
        this.currentWeatherModel.imageUrl = this.service.getImage(this.currentWeatherModel.main);
        this.currentWeatherModel.low = currentMin;
        this.currentWeatherModel.high = currentMax;
        this.currentWeatherModel.date = new Date(this.service.forecast.list[index].dt_txt.substring(0, 10)).toDateString().substring(0, 10);

        currentDate = this.service.forecast.list[index].dt_txt;
        this.myForecastDataList.push(this.currentWeatherModel);
        // console.log(this.currentWeatherModel.high);
        currentMin = null;
        currentMax = null;
      }
    }
    for (const item of this.myForecastDataList) {

    }
    this.populateGraph();

  }

  populateGraph() {
    let tempMinArray = [];
    let tempMaxArray = [];
    this.lineChartLabels = [];
    console.log(this.myForecastDataList.length);
    for (const item of this.myForecastDataList) {
      tempMinArray.push(item.low);
      tempMaxArray.push(item.high);
      this.lineChartLabels.push(item.date);
      console.log('my Data list lows: ' + item.low);
      // console.log(item.low);
    }
    this.lineChartData = [{ data: tempMaxArray, label: 'Max' }, { data: tempMinArray, label: 'Min' }];
  }
}
