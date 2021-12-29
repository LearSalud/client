import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';
import { MyReservationsComponent } from './my-reservations/my-reservations.component';
import { HealthCentersComponent } from './health-centers/health-centers.component';
import { AddHealthCenterComponent } from './add-health-center/add-health-center.component';
import { MyOfficesComponent } from './my-offices/my-offices.component';
import { MyAgendaComponent } from './my-agenda/my-agenda.component';
import { AddOfficeComponent } from './add-office/add-office.component';
import { ComponentsModule } from '../components/components.module';
import { FormsModule } from '@angular/forms';
import { OfficesComponent } from './offices/offices.component';
import { AddReservationComponent } from './add-reservation/add-reservation.component';
import { PagesRoutingModule } from './pages-routing.module';

@NgModule({
  declarations: [
    HomeComponent,
    MyReservationsComponent,
    HealthCentersComponent,
    AddHealthCenterComponent,
    MyOfficesComponent,
    MyAgendaComponent,
    AddOfficeComponent,
    OfficesComponent,
    AddReservationComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    MaterialModule,
    RouterModule,
    ComponentsModule,
    FormsModule,
  ],
})
export class PagesModule {}
