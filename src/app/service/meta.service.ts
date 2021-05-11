import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MetaService {

  // API end-point URL
  private readonly apiURL = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa(`${environment.user}:${environment.password}`)
    })
  }

  httpOptionsPost = {
    headers: new HttpHeaders({
      'Content-Type': 'text/xml',
      'Accept': 'application/xml',
      'Authorization': 'Basic ' + btoa(`${environment.user}:${environment.password}`)
    })
  }


  resolveMeta(tableName: string): Observable<any> {
    return this.http.get(this.apiURL + `/meta/${tableName}`, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  resolvePost(tableName: string, rowData: any): Observable<any> {
    console.log('Your form data : ', rowData);
    const newRow = `<${tableName} ${rowData} />`;
    return this.http.post(this.apiURL + `/${tableName}`, newRow, this.httpOptionsPost)
      .pipe(
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
    console.error(errorMessage);
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
