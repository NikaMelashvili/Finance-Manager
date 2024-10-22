import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SignUp } from '../common/sign-up';
import { Observable, tap } from 'rxjs';
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

  public currentUserEmail: string = '';

  userProfile: UserResponseDTO = new UserResponseDTO();

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

    return this.http.get<UserResponseDTO>(
      `${this.baseUrlProfile}/byEmail?email=${this.currentUserEmail}`,
      {
        headers,
        withCredentials: true,
      }
    );
  }

  attachTokenToHeaders(token: string): HttpHeaders {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);
    return headers;
  }
}
