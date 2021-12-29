import { Component, OnInit } from '@angular/core';
import { FetchService } from '../services/fetch.service';
import { AuthService } from '../../authentication/services/auth.service';
import { Agenda } from '../interfaces/pages.interface';

@Component({
  selector: 'app-my-agenda',
  templateUrl: './my-agenda.component.html',
  styles: [],
})
export class MyAgendaComponent implements OnInit {
  public userId = '';
  public date = `${new Date().getFullYear()}-${
    new Date().getMonth() + 1
  }-${new Date().getDate()}`;

  public agenda: Agenda[] = [];

  constructor(
    private fetchService: FetchService,
    private authService: AuthService
  ) {
    this.userId = this.authService.currentUser._id;
  }

  ngOnInit(): void {
    this.fetchService.getMyAgenda(this.userId, this.date).subscribe(
      (res) =>
        (this.agenda = res.sort((a, b) => {
          if (a.fecha === b.fecha) {
            return b.empieza - a.empieza;
          }
          return a.fecha > b.fecha ? -1 : 1;
        }))
    );
  }

  changeAgenda() {
    this.fetchService
      .getMyAgenda(this.userId, this.date.toString())
      .subscribe(
        (res) =>
          (this.agenda = res.sort((a, b) => (a.fecha > b.fecha ? -1 : 1)))
      );
  }
}
