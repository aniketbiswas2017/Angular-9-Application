import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  public weatherSearchForm: FormGroup;
  public getData: any;
  public dt: any;
  public date: any;
  public day: string;
  public displayWeather = false;
  public icon0 : any;
  public icon1 : any;
  public icon2 : any;
  public icon3 : any;
  public icon4 : any;
  public day_array = [];
  public date_array = [];
  public icon_array = [];
  public Cities = [];


  constructor(
    private formBuilder: FormBuilder,
    private apiService: WeatherService,
  ) {
  }

  ngOnInit() {
    this.weatherSearchForm = this.formBuilder.group({
      location: [""]
    });

  }
  clearArray(){
    this.Cities.length = 0;
    this.displayWeather = false;
  }

  updateData(city) {
    this.apiService.getData(city).subscribe(data => {
      this.getData = data;
    });
  }

  sendToAPI(formValues) {
    this.apiService.getData(formValues.location).subscribe(data => {
      this.getData = data;
      const weatherData = this.getData?.city.name;
      this.day_array.length, this.date_array.length, this.icon_array.length  = 0;
      if (this.Cities.includes(weatherData) === false) 
        this.Cities.push(weatherData);
      console.log(this.Cities);
      
      if (data) { // For displaying contents of weather information of a city
        this.displayWeather = true;
      } else {
        this.displayWeather = false;
      }

      for (let i = 0; i < this.getData.cnt; i++){ // For pushing each day's date, icon and day to arrays
        this.dt = this.getData?.list[i].dt;
        this.date = new Date(this.dt * 1000);
        this.day = this.date.toString();
        this.day_array.push(this.day.substring(0,3));
        this.date_array.push(this.day.substring(8,10));
        this.icon_array.push(this.getData.list[i].weather[0].main);
      }

      this.icon0 = this.icon_array[0];// For svg icon selection
      this.icon1 = this.icon_array[1];
      this.icon2 = this.icon_array[2];
      this.icon3 = this.icon_array[3];
      this.icon4 = this.icon_array[4];
      //console.log(this.getData);
      //console.log(this.day_array);
      //console.log(this.date_array);
      //console.log(this.getData.list);
      //console.log(this.icon_array);
    });
  }
}