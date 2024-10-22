import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserResponseDTO } from '../../common/user-response-dto';
import { CommonModule } from '@angular/common';
import { getTokenFromCookie } from '../../utils/cookie';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="user" class="container mt-4">
      <div class="row justify-content-center">
        <div class="col-md-8 text-center">
          <h2 class="mb-4">User Profile</h2>
          <div class="profile-picture-container mb-3">
            <img
              [src]="'data:image/png;base64,' + user.profilePicture"
              alt="Profile Picture"
              class="rounded-circle"
            />
          </div>
          <h4>{{ user.email }}</h4>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .profile-picture-container img {
        width: 140px;
        height: 140px;
        object-fit: cover;
        border: 2px solid #007bff;
        padding: 4px;
        background-color: white;
      }
    `,
  ],
})
export class ProfileComponent implements OnInit {
  user!: UserResponseDTO;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    const email = this.authService.currentUserEmail;
    if (this.authService.currentUserEmail) {
      this.loadUserProfile(email);
    } else {
      console.error('User email is not set.');
    }
  }

  loadUserProfile(email: string) {
    this.authService.loadUserProfile(email).subscribe(
      (response) => {
        this.user = response;
        console.log('response: ' + response);
      },
      (error) => {
        console.error("Couldn't load user profile. " + error);
      }
    );
  }
}
