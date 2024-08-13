import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AngularFireAuth } from '@angular/fire/compat/auth'; 
import { GoogleAuthProvider, signInWithPopup, signOut as firebaseSignOut } from 'firebase/auth'; 
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User as AppUser } from '../user.model'; 

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiKey: string = environment.api_key;
  private baseUrl: string = 'https://api.openweathermap.org/data/2.5/weather';

  
  user$: Observable<AppUser | null> = this.afAuth.authState.pipe(
    map(firebaseUser => firebaseUser ? { displayName: firebaseUser.displayName } : null)
  );

  constructor(private http: HttpClient, private afAuth: AngularFireAuth) {}

  getweather(city: string, units: string) {
    const url = `${this.baseUrl}?q=${city}&appid=${this.apiKey}&units=${units}`;
    return this.http.get(url);
  }

  async googleSignIn(): Promise<void> {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(this.afAuth as any, provider); 
      console.log('User signed in:', result.user);
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  }

  async signOut(): Promise<void> {
    try {
      await (this.afAuth as any).signOut(); 
      console.log('User signed out');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  }
}
