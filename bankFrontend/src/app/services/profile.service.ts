import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {catchError, Observable, throwError} from "rxjs";
import {UserResponseDTO} from "../common/user-response-dto";
import {getTokenFromCookie} from "../utils/cookie";
import {attachTokenToHeaders} from "../utils/cookie";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private baseApiUrl: string = environment.baseApiUrl;

  private baseUrlProfile: string = this.baseApiUrl + '/profile';

  constructor(private http: HttpClient) { }

  public loadUserProfile(email: string): Observable<UserResponseDTO> {
    const token: string = getTokenFromCookie() ?? '';
    if (!token) {
      console.error('No token found in cookies');
      throw new Error('No token found in cookies');
    }

    const headers = attachTokenToHeaders(token);
    console.log('Headers:', headers);

    return this.http
      .get<UserResponseDTO>(`${this.baseUrlProfile}/byEmail?email=${email}`, {
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
}
