import { Component, OnInit } from '@angular/core';
import { FetchService } from '../services/fetch.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import {
  Schedule,
  IDCentroSalud,
  IDDoctor,
} from '../interfaces/pages.interface';
import { CreateService } from '../services/create.service';

@Component({
  selector: 'app-add-reservation',
  templateUrl: './add-reservation.component.html',
  styles: [],
})
export class AddReservationComponent implements OnInit {
  public date = `${new Date().getFullYear()}-${
    new Date().getMonth() + 1
  }-${new Date().getDate()}`;
  public idConsultorio: string = '';
  public idDoctor: string = '';
  public schedules: Schedule[] = [];
  public tipo: string = 'normal';

  constructor(
    private fetchService: FetchService,
    private createService: CreateService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  getSchedules() {
    this.fetchService
      .getOfficeScheduleById(this.idConsultorio, this.date.toString())
      .subscribe((res) => {
        this.schedules = res.data.horarios;
        this.idDoctor = res.data.idDoctor;
      });
  }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => {
          this.idConsultorio = id;
          return this.fetchService.getOfficeScheduleById(id, this.date);
        })
      )
      .subscribe((res) => {
        this.schedules = res.data.horarios;
        this.idDoctor = res.data.idDoctor;
      });
  }

  reserve(schedule: Schedule) {
    const data = {
      fecha: this.date,
      idConsultorio: this.idConsultorio,
      ...schedule,
      idDoctor: this.idDoctor,
      tipo: this.tipo,
    };

    this.createService.createReservation(data).subscribe((res) => {
      if (res.data) this.router.navigate(['/mis-citas']);
    });
  }
}
