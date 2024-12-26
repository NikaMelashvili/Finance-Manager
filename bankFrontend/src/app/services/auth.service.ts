import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SignUp } from '../common/sign-up';
import {catchError, Observable, tap, throwError} from 'rxjs';
import { Login } from '../common/login';
import { UserResponseDTO } from '../common/user-response-dto';
import { getTokenFromCookie } from '../utils/cookie';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrlAuth = 'http://localhost:8080/rest/authentication';
  private baseUrlProfile = 'http://localhost:8080/rest/profile';

  private signUpUrl = this.baseUrlAuth + '/register';
  private loginUrl = this.baseUrlAuth + '/authenticate';

  public currentUserEmail: string = 'mela1@mail.ge';

  constructor(private http: HttpClient) {}

  userRegister(user: SignUp): Observable<{ token: string }> {
    this.currentUserEmail = user.email;
    return this.http.post<{ token: string }>(this.signUpUrl, user, {
      withCredentials: true,
    });
  }

  userLogin(user: Login): Observable<{ token: string }> {
    this.currentUserEmail = user.email;
    return this.http.post<{ token: string }>(this.loginUrl, user, {
      withCredentials: true,
    });
  }

  loadUserProfile(email: string): Observable<UserResponseDTO> {
    const token: string = getTokenFromCookie() ?? '';
    if (!token) {
      console.error('No token found in cookies');
      throw new Error('No token found in cookies');
    }

    const headers = this.attachTokenToHeaders(token);
    console.log('Headers:', headers);

    return this.http
      .get<UserResponseDTO>(`${this.baseUrlProfile}/byEmail?email=${this.currentUserEmail}`, {
        headers,
        withCredentials: true,
      })
      .pipe(
        catchError((err) => {
          console.error('Error fetching user profile:', err);
          return throwError(() => new Error('Failed to load user profile'));
        })
      );
  }

  attachTokenToHeaders(token: string): HttpHeaders {
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }
}
