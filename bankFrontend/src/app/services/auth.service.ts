import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SignUp} from '../common/sign-up';
import {Observable} from 'rxjs';
import {Login} from '../common/login';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private baseUrlAuth = environment.baseApiUrl;

  private signUpUrl = this.baseUrlAuth + '/authentication/register';

  private loginUrl = this.baseUrlAuth + '/authentication/authenticate';

  public currentUserEmail: string = '';

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
}
