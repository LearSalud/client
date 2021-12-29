import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HealthCenter } from '../interfaces/pages.interface';
import { CreateService } from '../services/create.service';

@Component({
  selector: 'app-add-health-center',
  templateUrl: './add-health-center.component.html',
  styles: [],
})
export class AddHealthCenterComponent {
  public healthCenter: HealthCenter = {
    nombre: '',
    ubicacion: '',
    empieza: 8,
    finaliza: 17,
  };

  constructor(
    private createService: CreateService,
    private snackBar: MatSnackBar
  ) {}

  registerHealthCenter() {
    this.createService
      .createHealthCenter(this.healthCenter)
      .subscribe((res) => {
        if (res.data) {
          this.snackBar.open('Centro de salud creado correctamente', 'Cerrar', {
            duration: 3000,
          });
          this.healthCenter.nombre = '';
          this.healthCenter.ubicacion = '';
          this.healthCenter.empieza = 8;
          this.healthCenter.finaliza = 17;
        }
      });
  }
}
