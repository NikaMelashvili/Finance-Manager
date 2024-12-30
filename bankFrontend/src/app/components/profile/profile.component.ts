import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {UserResponseDTO} from '../../common/user-response-dto';
import {CommonModule} from '@angular/common';
import {Router} from '@angular/router';
import {ProfileService} from '../../services/profile.service'
import {RouterLink} from "@angular/router";
import {AnalysisResponse} from "../../common/analysis-response";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
      <div class="profile-parent-container">
        <div *ngIf="user" class="profile-container mt-4 logical">
          <div class="profile-picture-container">
            <img
              [src]="'data:image/png;base64,' + user.pfp"
              alt="Profile Picture"
              class="rounded-circle"
            />
          </div>
          <div class="profile-details">
            <h4>{{ user.email }}</h4>
            <button class="btn btn-primary mt-3" [routerLink]="['/user-data']">Financial Data</button>
            <br>
            <button class="btn btn-primary mt-3" (click)="getAnalysis()">Get Analysis</button>
          </div>
        </div>
        <div class="logical" *ngIf="analysisResponse">
          <p>{{ analysisResponse.message }}</p>
        </div>
      </div>
  `,
  styles: [
    `
      .profile-parent-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20px;
        background-color: #f8f9fa;
        border-radius: 10px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      }
      .profile-container {
        display: flex;
        align-items: center;
        background-color: transparent;
        padding: 20px;
        border-radius: 10px;
      }
      .profile-picture-container {
        margin-right: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .profile-picture-container img {
        width: 140px;
        height: 140px;
        object-fit: cover;
        border-radius: 50%;
        border: 4px solid #007bff;
        padding: 4px;
        background-color: #ffffff;
      }
      .profile-details h4 {
        font-size: 1.5rem;
        font-weight: bold;
        color: #343a40;
        margin-bottom: 10px;
      }
      .profile-details .btn {
        font-size: 1rem;
        padding: 10px 20px;
        margin-bottom: 10px;
      }
      .profile-details .btn-primary {
        background-color: #007bff;
        border: none;
        transition: background-color 0.3s ease;
      }
      .profile-details .btn-primary:hover {
        background-color: #0056b3;
      }

      .profile-details button + br {
        margin-bottom: 10px;
      }
      div[ngIf="analysisResponse"] p {
        font-size: 1.2rem;
        color: #495057;
        background-color: #e9ecef;
        padding: 10px;
        border-radius: 5px;
        margin-top: 15px;
      }
      .logical {
        width: 600px;
      }
    `,
  ],

})
export class ProfileComponent implements OnInit {

  user!: UserResponseDTO;

  analysisResponse!: AnalysisResponse;

  email: string = '';

  constructor(private profileService: ProfileService, private authService: AuthService, private router: Router) {}

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
    this.profileService.loadUserProfile(email).subscribe({
      next: (response) => {
        this.user = response;
        console.log('Response:', response);
      },
      error: (error) => {
        console.error("Couldn't load user profile:", error);
      },
    });
  }

  getAnalysis(): void {
    this.profileService.getAnalysis(this.email).subscribe({
      next: (response) => {
        this.analysisResponse = response;
        console.log('Analysis:', response);
      },
      error: (error) => {
        console.error("Couldn't get analysis:", error);
      },
    });
  }
}
