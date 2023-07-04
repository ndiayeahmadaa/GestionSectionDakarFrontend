import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Membre } from '../models/membre.types';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MembreService {

  // headers = new HttpHeaders();

  url = 'http://localhost:8089/membres';

  constructor(private _httpClient: HttpClient) {
    // this.headers = this.headers.set('content-type', 'undefined');
  }

  ajouterMembre(membre: Membre): Observable<any> {
    return this._httpClient.post<Membre>(this.url, membre, {
      observe: 'response'
    });
  }

  modifierMembre(membre: Membre): Observable<any> {
    return this._httpClient.put<Membre>(this.url, membre, {
      observe: 'response',
    });
  }

  listeMembre(): Observable<HttpResponse<any>> {
    return this._httpClient.get<any>(this.url, {
      observe: 'response',
    })
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
