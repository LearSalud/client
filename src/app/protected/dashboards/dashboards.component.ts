import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../authentication/services/auth.service';

@Component({
  selector: 'app-dashboards',
  templateUrl: './dashboards.component.html',
  styles: [
    `
      *{
        margin: 15px;
      }
    `
  ]
})
export class DashboardsComponent {

  get usuario(){
    return this.authService.usuario;
  }

  constructor(private router: Router, private authService: AuthService) { }

  logout(){
    this.router.navigateByUrl('/authentication');
    this.authService.logout();

  }


}
