import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User as AppUser } from '../user.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiKey: string = environment.api_key;
  private baseUrl: string = 'https://api.openweathermap.org/data/2.5/weather';
  // private auth = getAuth();
  // private provider = new GoogleAuthProvider();    

  // user$: Observable<AppUser | null> = this.afAuth.authState.pipe(
  //   map(firebaseUser => firebaseUser ? { displayName: firebaseUser.displayName } : null)
  // );

  constructor(private http: HttpClient) { }

  getweather(city: string, units: string) {
    const url = `${this.baseUrl}?q=${city}&appid=${this.apiKey}&units=${units}`;
    return this.http.get(url);
  }

  // async googleSignIn() {

  //   const provider = new firebase.auth.GoogleAuthProvider();

  //   const auth = getAuth();
  //   console.log(auth);
  //   try {
  //     await signInWithPopup(this.auth, this.provider)
  //     // const result = this.afAuth.signInWithPopup(provider);
  //     // console.log('User signed in:', result.user);
  //   } catch (error) {
  //     console.error('Error signing in with Google:', error);
  //   }
  // }

  // async signOut(): Promise<void> {
  //   const auth = getAuth();
  //   try {
  //     await auth.signOut();
  //     console.log('User signed out');
  //   } catch (error) {
  //     console.error('Error signing out:', error);
  //   }
  // }
}
