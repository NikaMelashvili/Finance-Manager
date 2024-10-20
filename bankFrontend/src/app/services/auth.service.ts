import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly signupUrl = 'http://192.168.249.96:8080/rest/authentication/register';
  private readonly authenticateUrl = 'http://192.168.249.96:8080/rest/authentication/authenticate';
}
