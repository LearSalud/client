import { Component, OnInit } from '@angular/core';
import { FetchService } from '../services/fetch.service';
import { HealthCenter } from '../interfaces/pages.interface';
import { DeleteService } from '../services/delete.service';
import { AuthService } from '../../authentication/services/auth.service';

@Component({
  selector: 'app-health-centers',
  templateUrl: './health-centers.component.html',
  styles: [],
})
export class HealthCentersComponent implements OnInit {
  public healthCenters: HealthCenter[] = [];
  public isAdmin: boolean = false;

  constructor(
    private fetchService: FetchService,
    private deleteService: DeleteService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.authService.currentUser?.rol === 'ADMIN';
    this.fetchService
      .getHealthCenters()
      .subscribe((res) => (this.healthCenters = res));
  }

  deleteHealthCenter(id: string) {
    this.deleteService.deleteHealthCenter(id).subscribe((res) => {
      if (res === true) {
        window.location.reload();
      }
    });
  }
}
