import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  myWeather: any;
  temperature: number = 0;
  feelsLikeTemp: number = 0;
  humidity: number = 0;
  pressure: number = 0;
  summary: string = '';
  city: string = '';
  inputCity: string = '';
  units: string = 'imperial';
  isLoggedIn: boolean = false;
  username: string | null = null; 

  constructor(private apiService: ApiService, private afAuth: AngularFireAuth, private router: Router) { }

  ngOnInit(): void {
    this.afAuth.authState.subscribe(user => {
      this.isLoggedIn = !!user;
      this.username = user ? user.displayName : null; 
    });
  }

  getWeather() {
    this.apiService.getweather(this.city, this.units).subscribe({
      next: (res) => {
        console.log(res);
        this.myWeather = res;
        this.temperature = this.myWeather.main.temp;
        this.feelsLikeTemp = this.myWeather.main.feels_like;
        this.humidity = this.myWeather.main.humidity;
        this.pressure = this.myWeather.main.pressure;
        this.summary = this.myWeather.weather[0].main;
      },
      error: (error) => console.log(error.message),
      complete: () => console.info('API call completed')
    });
  }

  onRadioButtonChange() {
    this.units = this.units === 'imperial' ? 'metric' : 'imperial';
    this.getWeather();
  }

  onCitySubmit() {
    this.city = this.inputCity.trim();
    this.getWeather();
  }

  async signOut() {
    try {
      await this.afAuth.signOut();
      this.router.navigate(['/login']); 
    } catch (error) {
      console.error('Sign out failed:', error); 
    }
  }
}
