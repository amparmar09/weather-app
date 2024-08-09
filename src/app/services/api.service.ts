import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment'; 



@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiKey: string = environment.api_key; 
  private baseUrl: string = 'https://api.openweathermap.org/data/2.5/weather';

  constructor(private http: HttpClient) { }

  getweather(city: string, units: string) {
    const url = `${this.baseUrl}?q=${city}&appid=${this.apiKey}&units=${units}`;
    return this.http.get(url);
  }
}
