import { Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';

export const routes: Routes = [
  { path: 'signup', component: SignUpComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'landing-page', component: LandingPageComponent },
  { path: '', redirectTo: 'landing-page', pathMatch: 'full' },
  { path: '**', redirectTo: 'landing-page', pathMatch: 'full' },
];
