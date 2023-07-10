import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Fonction } from '../models/fonction.types';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class FonctionService {
  url = 'http://localhost:8089/fonctions';


  constructor(private _httpClient: HttpClient) { }

  ajouterFonction(fonction: Fonction): Observable<any> {

    return this._httpClient.post<Fonction>(this.url, fonction, {
      observe: 'response'
    });
  }

  modifierFonction(fonction: Fonction): Observable<any> {
    return this._httpClient.put<Fonction>(this.url, fonction, {
      observe: 'response'
    });
  }
  listeFonction(): Observable<HttpResponse<any>> {
    return this._httpClient.get<any>(this.url, {
      observe: 'response',
    })
      .pipe(catchError(this.errorHandler));
  }
  supprimerFonction(code: string): Observable<HttpResponse<any>> {

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
