import { Component, OnInit } from '@angular/core';
import { FetchService } from '../services/fetch.service';
import { AuthService } from '../../authentication/services/auth.service';
import { MyReservation } from '../interfaces/pages.interface';

@Component({
  selector: 'app-my-reservations',
  templateUrl: './my-reservations.component.html',
  styles: [],
})
export class MyReservationsComponent implements OnInit {
  public userId = '';
  public reservations: MyReservation[] = [];

  constructor(
    private fetchService: FetchService,
    private authService: AuthService
  ) {
    this.userId = this.authService.currentUser._id;
  }

  ngOnInit(): void {
    this.fetchService.getMyReservation(this.userId).subscribe((res) => {
      this.reservations = res.sort((a, b) => {
        if (a.fecha === b.fecha) {
          return b.empieza - a.empieza;
        }
        return a.fecha > b.fecha ? -1 : 1;
      });
    });
  }
}
