import { SignUp } from './../../common/sign-up';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-up',
  template: `
    <div class="container-sign-up">
      <form [formGroup]="signUpFormGroup" (ngSubmit)="signUp()">
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
        <div class="mb-3">
          <label for="formFile" class="form-label">Profile Picture</label>
          <input
            (change)="onFileChange($event)"
            class="form-control"
            type="file"
            id="formFile"
            formControlName="pfp"
          />
        </div>
        <div class="mb-3">
          <button type="submit" class="btn btn-primary mb-3">Submit</button>
        </div>
      </form>
    </div>
  `,
  styles: [
    `
      .container-sign-up {
        padding-top: 20px;
      }
    `,
  ],
  standalone: true,
  imports: [ReactiveFormsModule],
})
export class SignUpComponent implements OnInit {
  signUpFormGroup!: FormGroup;
  pfp: string | null = null;
  userSignUp: SignUp | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.signUpFormGroup = this.formBuilder.group({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      pfp: new FormControl('', [Validators.required]),
    });
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        let result = reader.result as string;
        this.pfp = result.split(',')[1];
      };

      reader.readAsDataURL(file);
    }
  }

  signUp(): void {
    if (this.signUpFormGroup.valid && this.pfp) {
      const { email, password } = this.signUpFormGroup.value;
      this.userSignUp = new SignUp(email, password, this.pfp);

      this.authService.userRegister(this.userSignUp).subscribe({
        next: (response) => {
          console.log('Registration successful, token:', response.token);
          this.signUpFormGroup.reset();
        },
        error: (error) => {
          console.error('Registration failed:', error);
        },
      });
    }
  }
}
