import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  public API:string;
  public Days_KEY:string; 
  public Unit:string;

  constructor(private http: HttpClient) {
    this.API = "http://api.openweathermap.org/data/2.5/forecast/daily?q=";
    this.Days_KEY = "&cnt=5&appid=c51223c219d6aec8cb8c5210449bd859";
    this.Unit = "&units=metric";
  }

  getData(location): Observable<Object> {
    let url = this.API + location + this.Days_KEY + this.Unit;
    return this.http.get(url).pipe( 
      catchError(catchError(this.handlerError)));
  }
  handlerError(handlerError: any): (err: any, caught: Observable<any>) => Observable<any> {
    throw new Error("No data found for your city");
  }
}
