import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddHealthCenterComponent } from './add-health-center/add-health-center.component';
import { MyReservationsComponent } from './my-reservations/my-reservations.component';
import { MyOfficesComponent } from './my-offices/my-offices.component';
import { MyAgendaComponent } from './my-agenda/my-agenda.component';
import { AddOfficeComponent } from './add-office/add-office.component';
import { AddReservationComponent } from './add-reservation/add-reservation.component';
import { OfficesComponent } from './offices/offices.component';
import { HealthCentersComponent } from './health-centers/health-centers.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', component: HealthCentersComponent },
      {
        path: 'mis-citas',
        component: MyReservationsComponent,
      },
      {
        path: 'crear-centro-salud',
        component: AddHealthCenterComponent,
      },
      {
        path: 'mis-consultorios',
        component: MyOfficesComponent,
      },
      {
        path: 'crear-consultorio',
        component: AddOfficeComponent,
      },
      {
        path: 'mi-agenda',
        component: MyAgendaComponent,
      },
      {
        path: 'editar-consultorio/:id',
        component: AddOfficeComponent,
      },
      {
        path: 'consultorio/:id',
        component: AddReservationComponent,
      },
      {
        path: ':id',
        component: OfficesComponent,
      },
      { path: '**', redirectTo: '' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
