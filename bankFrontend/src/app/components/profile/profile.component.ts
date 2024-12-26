import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {UserResponseDTO} from '../../common/user-response-dto';
import {CommonModule} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="user" class="profile-container mt-4">
      <div class="profile-picture-container">
        <img
          [src]="'data:image/png;base64,' + user.pfp"
          alt="Profile Picture"
          class="rounded-circle"
        />
      </div>
      <div class="profile-details">
        <h4>{{ user.email }}</h4>
        <button class="btn btn-primary mt-3" (click)="navigateToFinancialData()">Financial Data</button>
      </div>
    </div>
  `,
  styles: [
    `
      .profile-container {
        display: flex;
        align-items: flex-start;
      }
      .profile-picture-container {
        margin-right: 20px;
      }
      .profile-picture-container img {
        width: 140px;
        height: 140px;
        object-fit: cover;
        border: 2px solid #007bff;
        padding: 4px;
      }
    `,
  ],
})
export class ProfileComponent implements OnInit {
  user!: UserResponseDTO;
  email: string = 'mela1@mail.ge';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.email = this.authService.currentUserEmail;
    if (this.authService.currentUserEmail) {
      this.loadUserProfile(this.email);
    } else {
      console.error('User email is not set.');
      this.router.navigate(['/login']);
    }
  }

  loadUserProfile(email: string): void {
    this.authService.loadUserProfile(email).subscribe({
      next: (response) => {
        this.user = response;
        console.log('Response:', response);
      },
      error: (error) => {
        console.error("Couldn't load user profile:", error);
      },
      complete: () => {
        console.log('User profile loading complete.');
      },
    });
  }

  navigateToFinancialData(): void {
    this.router.navigate(['/financial-data']);
  }
}
