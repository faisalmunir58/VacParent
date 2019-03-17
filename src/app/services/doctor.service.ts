import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class DoctorService extends BaseService {

  private readonly API_CHILD = `${environment.BASE_URL}`

  constructor(
    protected http: HttpClient
  ) { super(http); }

  getDoctor(id: string): Observable<any> {
    const url = `${this.API_CHILD}doctor/${id}/doctor-clinics`;
    return this.http.get(url, this.httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  changeDoctor(data): Observable<any> {
    const url = `${this.API_CHILD}child/change-doctor/`;
    return this.http.post(url, data, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

}
