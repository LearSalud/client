import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DeleteService {
  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  deleteHealthCenter(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/centro/${id}`);
  }

  deleteOffice(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/consultorio/${id}`);
  }
}
