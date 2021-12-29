import { Component, OnInit } from '@angular/core';
import { Offices } from '../interfaces/pages.interface';
import { FetchService } from '../services/fetch.service';
import { AuthService } from '../../authentication/services/auth.service';

@Component({
  selector: 'app-my-offices',
  templateUrl: './my-offices.component.html',
  styles: [],
})
export class MyOfficesComponent implements OnInit {
  public offices: Offices[] = [];

  constructor(
    private fetchService: FetchService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const id = this.authService.currentUser._id;
    this.fetchService
      .getOfficesByDoctorId(id)
      .subscribe((res) => (this.offices = res));
  }
}
