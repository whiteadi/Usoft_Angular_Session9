import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PersonsService {


  // API end-point URL
  private readonly apiURL = environment.apiUrl;
  private readonly apiRoot = environment.apiRoot;

  constructor(private http: HttpClient) { }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa(`${environment.user}:${environment.password}`)
    })
  }

  // create a method named: resolvePersons()
  // this method returns list-of-persons in form of Observable
  // every HTTTP call returns Observable object
  resolvePersons(): Observable<any> {
    console.log('Request is sent!');
    // this.http is a HttpClient library provide by @angular/common
    // we are calling .get() method over this.http object
    // this .get() method takes URL to call API
    return this.http.get(this.apiURL + '/PERSON;GENDER=M' + '?LeadingZeroForDecimal=yes', this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  // create a method named: resolvePerson()
  // this method returns a-person by id in form of Observable
  // every HTTTP call returns Observable object
  resolvePerson(personId: string): Observable<any> {
    return this.http.get(this.apiRoot + `/TableColumns/person/${personId}` + '?LeadingZeroForDecimal=yes', this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  // Error handling 
  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
