import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Signup } from '../interfaces/signup';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private registerUrl = 'http://192.168.249.96:8080/rest/authentication/register';
  private authenticateUrl = 'http://192.168.249.96:8080/rest/authentication/authenticate';

  constructor(private http: HttpClient) { }

  register(userData: Signup): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this.registerUrl, userData, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  authenticate(email: string, password: string): Observable<any> {
    const loginData = { email, password };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this.authenticateUrl, loginData, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}
