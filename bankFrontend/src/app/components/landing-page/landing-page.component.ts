import { Component } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    LoginComponent,
    SignUpComponent,
    CommonModule,
    RouterOutlet,
    RouterLink,
  ],
  template: `
    <div class="container">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [
    `
      .cursor-pointer {
        cursor: pointer;
      }
    `,
  ],
})
export class LandingPageComponent {}
