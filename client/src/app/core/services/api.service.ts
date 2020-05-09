import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ApiService {
  constructor(
    private http: HttpClient,
  ) { }

  private formatErrors(error: any) {
    return throwError(error.error);
  }

  get(url: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(`${url}`, { params })
      .pipe(catchError(this.formatErrors));
  }

  post(url: string, body: object = {}): Observable<any> {
    return this.http.post(
      `${url}`,
      JSON.stringify(body)
    ).pipe(catchError(this.formatErrors));
  }

  put(url: string, body: object = {}): Observable<any> {
    return this.http.put(
      `${url}`,
      JSON.stringify(body)
    ).pipe(catchError(this.formatErrors));
  }

  delete(url: string): Observable<any> {
    return this.http.delete(url)
      .pipe(catchError(this.formatErrors));
  }
}
