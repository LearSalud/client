import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/authentication/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [],
})
export class HomeComponent implements OnInit {
  isAdmin: boolean = false;
  isDoctor: boolean = false;
  isUser: boolean = false;

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    if (this.authService.currentUser) {
      if (this.authService.currentUser.rol == 'ADMIN') this.isAdmin = true;
    }

    if (this.authService.currentUser) {
      if (this.authService.currentUser.rol == 'DOCTOR') this.isDoctor = true;
    }

    if (this.authService.currentUser) {
      if (this.authService.currentUser.rol == 'USER') this.isUser = true;
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/authentication');
  }
}
