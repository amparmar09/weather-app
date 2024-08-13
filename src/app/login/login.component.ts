import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';  
import { User as AppUser } from '../user.model'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  user$ = this.apiService.user$;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getUser(); 
  }

  signInWithGoogle(): void {
    this.apiService.googleSignIn();
  }

  signOut(): void {
    this.apiService.signOut();
  }

  getUser(): void {
    this.apiService.user$.subscribe((user) => {
      console.log(user); 
    });
  }
}
