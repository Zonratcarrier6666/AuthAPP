import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { RegisterRequest } from '../../interfaces/register-request';
import { LoginRequest } from '../../interfaces/login-request';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
})
export class Register {
  showPassword = false;
  showConfirmPassword = false;
  registrationSuccess = false;

  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group(
      {
        fullName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator }
    );

    // Escucha cambios en el password o confirmPassword para validar de nuevo
    this.registerForm.get('password')?.valueChanges.subscribe(() => {
      this.registerForm.get('confirmPassword')?.updateValueAndValidity();
    });
    this.registerForm.get('confirmPassword')?.valueChanges.subscribe(() => {
      this.registerForm.get('confirmPassword')?.updateValueAndValidity();
    });
  }

  // Validador personalizado
  passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;

    if (!password || !confirm) return null;

    return password === confirm ? null : { notMatching: true };
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const data: RegisterRequest = this.registerForm.value;

    this.authService.register(data).subscribe({
      next: (response) => {
        if (response.isSuccess) {
          const loginData: LoginRequest = {
            email: data.email,
            password: data.password,
          };
          this.authService.login(loginData).subscribe({
            next: (loginResponse) => {
              if (loginResponse.isSuccess) {
                this.registrationSuccess = true;
                this.router.navigate(['/']); // o '/dashboard'
              } else {
                alert('Login falló después del registro.');
              }
            },
            error: () => alert('Error en login después del registro.'),
          });
        } else {
          alert('Error al registrar usuario.');
        }
      },
      error: () => alert('Error en el servidor al registrar usuario.'),
    });
  }
}
