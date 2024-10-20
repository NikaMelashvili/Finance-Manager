import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';

export const routes: Routes = [
    { path: '', component:LandingPageComponent},
    { path: 'login', component:LoginComponent},
    { path: 'signup', component:RegisterComponent},
    { path: 'profile/:id', component: ProfileComponent },
];