import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/coreAuth/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {

  email = '';
  errorMessage = '';
  successMessage = '';
  isLoading = false;

  constructor(private authService: AuthService) {}

  onSubmit() {
    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.authService.forgotPassword({ email: this.email }).subscribe({
      next: (response) => {
        if (response.success) {
          this.successMessage = response.message;
        } else {
          this.errorMessage = response.message;
        }
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Error al enviar el enlace';
        this.isLoading = false;
      }
    });
  }
}