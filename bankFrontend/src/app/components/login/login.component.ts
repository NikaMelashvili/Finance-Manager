import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  FormBuilder,
  ReactiveFormsModule,
  FormControl,
  Validators,
} from '@angular/forms';
import { Login } from '../../common/login';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="container-login">
      <form [formGroup]="loginFormGroup" (ngSubmit)="login()">
        <div class="mb-3">
          <label for="email" class="form-label">Email address</label>
          <input
            type="email"
            class="form-control"
            id="email"
            formControlName="email"
            placeholder="name@example.com"
          />
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input
            type="password"
            class="form-control"
            id="password"
            formControlName="password"
            placeholder="Password"
          />
        </div>
        <div class="mb-3 btn-auth-container">
          <button type="submit" class="btn btn-primary btn-auth mb-3">Login</button>
        </div>
      </form>
    </div>
  `,
  styles: [
    `
      .container-login {
        padding-top: 20px;
        width: 100%;
      }
      .form-control {
        width: 400px;
      }
      @media (max-width: 768px) {
        .form-control {
          margin: auto;
          max-width: 85%;
        }
        .form-label {
          margin-left: 10%;
        }
      }
    `,
  ],
})
export class LoginComponent implements OnInit {
  loginFormGroup!: FormGroup;

  userLogin: Login | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loginFormGroup = this.formBuilder.group({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
    });
  }

  login() {
    if (this.loginFormGroup.valid) {
      const { email, password } = this.loginFormGroup.value;
      this.userLogin = new Login(email, password);

      this.authService.userLogin(this.userLogin).subscribe({
        next: (response) => {
          console.log('Login successful, token:', response.token);
          this.loginFormGroup.reset();
        },
        error: (error) => {
          console.error('Login failed:', error);
        },
      });
    }
  }
}
