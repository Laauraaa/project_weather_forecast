import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WeatherAPIResult } from './models/weatherAPI.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherAPIService {

  private backendUrl = '/api/weather'; 

  constructor(private httpClient: HttpClient) {}

  getCity(city: string): Observable<WeatherAPIResult> {
    return this.httpClient.get<WeatherAPIResult>(`${this.backendUrl}?city=${city}`);
  }
}
