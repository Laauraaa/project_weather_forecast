import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WeatherAPIResult } from './models/weatherAPI.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherAPIService {
  private apiUrl = 'https://project-weather-forecast.onrender.com/weather'; 

  constructor(private httpClient: HttpClient) {}

  getCity(city: string) {
    return this.httpClient.get<WeatherAPIResult>(`${this.apiUrl}/${city}`);
  }
}
