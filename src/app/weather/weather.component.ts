import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup ,ReactiveFormsModule, Validators } from '@angular/forms'; 

import { MatIconModule } from '@angular/material/icon';

import { WeatherAPIResult } from '../models/weatherAPI.model';
import { WeatherAPIService } from '../weather-api.service';


@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [ MatIconModule, ReactiveFormsModule, CommonModule],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.scss'
})
export class WeatherComponent implements OnInit{

  //var default
  weatherForm: FormGroup;
  weatherData: WeatherAPIResult | null = null;
  errorMessage: string = '';

  constructor(private weatherAPIService: WeatherAPIService) {

    this.weatherForm = new FormGroup({
      city: new FormControl('', [Validators.required, Validators.minLength(3)])
    });

  }

  ngOnInit(): void {
    
  };

  //api
  
  searchCity(){
    const city = this.weatherForm.get('city')?.value?.trim();
    
    if (!city) {
      console.error('Cidade inválida.');
      return; // Não faz a requisição se o campo estiver vazio
      }

    this.weatherAPIService.getCity(city).subscribe({
      next: (data) => {
        this.weatherData = data;
        console.log(data);
        this.errorMessage = '';
      },
      error: (err) => {
        if (err.status === 404) {
          this.errorMessage = 'Cidade inválida, por favor digite uma cidade válida.';
        } else {
          this.errorMessage = 'Ocorreu um erro, tente novamente.';
        }
        console.error(err);
      }
    });
      
    }; 
   
}
