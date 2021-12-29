import { Component, OnInit } from '@angular/core';
import { Office, HealthCenter, Schedule } from '../interfaces/pages.interface';
import { FetchService } from '../services/fetch.service';
import { User } from '../../authentication/interfaces/user.interfaces';
import { CreateService } from '../services/create.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-add-office',
  templateUrl: './add-office.component.html',
  styles: [],
})
export class AddOfficeComponent implements OnInit {
  public office: Office = {
    idDoctor: '0',
    idCentroSalud: '0',
    indicaciones: '',
    numeroConsultorio: 0,
    horarios: [],
  };
  public schedule: Schedule = {
    empieza: 9,
    finaliza: 10,
  };

  public healthCenters: HealthCenter[] = [];
  public doctors: User[] = [];
  public isEdit: boolean = false;
  public _id: string = '';

  constructor(
    private fetchService: FetchService,
    private createService: CreateService,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchService.getHealthCentersNameAndId().subscribe((data) => {
      this.healthCenters = data.centros;
      this.doctors = data.doctores;
    });
    if (this.router.url.includes('crear-consultorio')) {
      return;
    }
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => {
          if (id) {
            this.isEdit = true;
            this._id = id;
          }
          return this.fetchService.getOfficeById(id);
        })
      )
      .subscribe((res) => {
        this.office = res;
      });
  }

  pushSchedule() {
    this.office.horarios?.push({ ...this.schedule });
  }

  deleteSchedule(schedule: Schedule) {
    const index = this.office.horarios?.indexOf(schedule)!;
    if (index > -1) {
      this.office.horarios?.splice(index, 1);
    }
  }

  updateOffice() {
    this.createService
      .updateOfficeSchedule(this.office, this._id)
      .subscribe((res) => {
        if (res.data) {
          this.snackBar.open(
            'Consultorio actualizado correctamente',
            'Cerrar',
            {
              duration: 3000,
            }
          );
        }
      });
  }

  registerOficce() {
    this.createService.createOffice(this.office).subscribe((res) => {
      if (res.data) {
        this.snackBar.open('Consultorio creado correctamente', 'Cerrar', {
          duration: 3000,
        });
        this.office.idCentroSalud = '0';
        this.office.idDoctor = '0';
        this.office.indicaciones = '';
        this.office.numeroConsultorio = 0;
        this.office.horarios = [];
      }
    });
  }
}
