import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  signupForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) { // Inject AuthService
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      pfp: ['']
    });
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      const signupData = this.signupForm.value;
      this.authService.signup(signupData).subscribe(
        (response) => {
          console.log('Sign-up successful', response);
          // Handle success (e.g., navigate to login page or dashboard)
        },
        (error) => {
          console.error('Sign-up failed', error);
          // Handle error (e.g., show error message)
        }
      );
    }
  }
}
