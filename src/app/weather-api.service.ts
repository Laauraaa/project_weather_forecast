import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WeatherAPIResult } from './models/weatherAPI.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherAPIService {
  APIkey:string = '45f8d6a48ac2279c8954243037bb47b8'

  constructor(private httpClient: HttpClient) {}

  getCity(city: string){
    return this.httpClient.get<WeatherAPIResult>(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.APIkey}&units=metric&lang=pt_br`);
  };

}
