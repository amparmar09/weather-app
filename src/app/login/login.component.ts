import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';  
import { User as AppUser } from '../user.model'; 
import { GoogleAuthProvider } from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  // user$ = this.apiService.user$;
  userData:any;

  constructor(private router: Router, public afAuth: AngularFireAuth) { }

  ngOnInit(): void {
    // this.getUser(); 
  }

  // signInWithGoogle(): void {
  //   this.apiService.googleSignIn();
  // }

  // signOut(): void {
  //   this.apiService.signOut();
  // }

  // getUser(): void {
  //   this.apiService.user$.subscribe((user) => {
  //     console.log(user); 
  //   });
  // }


  async googleLogin() {
    const provider = new GoogleAuthProvider();
    try {
      const result = await this.afAuth.signInWithPopup(provider);
      console.log('USER::', result.user);

      
      this.router.navigate(['/Weather']);
    } catch (error) {
      console.error('Login failed:', error);
    }
  }
}
