import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Section } from '../models/section.types';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SectionService {

  url = 'http://localhost:8089/sections';

  constructor(private _httpClient: HttpClient) { }

  ajouterSection(section: Section): Observable<any> {

    return this._httpClient.post<Section>(this.url, section, {
     observe: 'response'
    });

 }
 modifierSection(section: Section): Observable<any> {
  return this._httpClient.put<Section>(this.url, section, {
    observe: 'response'
  });
}
listeSection(): Observable<HttpResponse<any>> {
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
