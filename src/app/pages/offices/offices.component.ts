import { Component, OnInit } from '@angular/core';
import { FetchService } from '../services/fetch.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Offices } from '../interfaces/pages.interface';
import { AuthService } from '../../authentication/services/auth.service';
import { DeleteService } from '../services/delete.service';

@Component({
  selector: 'app-offices',
  templateUrl: './offices.component.html',
  styles: [],
})
export class OfficesComponent implements OnInit {
  public offices: Offices[] = [];
  public isAdmin: boolean = false;

  constructor(
    private fetchService: FetchService,
    private activatedRoute: ActivatedRoute,
    private deleteService: DeleteService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.authService.currentUser?.rol === 'ADMIN';
    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.fetchService.getOffices(id)))
      .subscribe((res) => (this.offices = res));
  }

  deleteOffice(id: string) {
    this.deleteService.deleteOffice(id).subscribe((res) => {
      if (res === true) {
        window.location.reload();
      }
    });
  }
}
