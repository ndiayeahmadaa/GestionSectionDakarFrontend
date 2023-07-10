import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Dahira } from '../models/dahira.types';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DahiraService {

  url = 'http://localhost:8089/dahiras';

  constructor(private _httpClient: HttpClient) { }

  ajouterDahira(dahira: Dahira): Observable<any> {

     return this._httpClient.post<Dahira>(this.url, dahira, {
      observe: 'response'
     });

  }
  modifierDahire(dahira: Dahira): Observable<any> {
    return this._httpClient.put<Dahira>(this.url, dahira, {
      observe: 'response'
    });
  }
  listeDahira(): Observable<HttpResponse<any>> {
    return this._httpClient.get<any>(this.url, {
      observe: 'response',
    })
      .pipe(catchError(this.errorHandler));
  }
  deleteDahira(code: string): Observable<HttpResponse<any>> {

    const params = { code: code };


    return this._httpClient.delete<any>(
      this.url,
      {
        params: params
      }

    );
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
