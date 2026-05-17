import { Component, OnInit } from '@angular/core';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/coreAuth/services/auth.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent implements OnInit {

  token = '';
  newPassword = '';
  confirmPassword = '';
  errorMessage = '';
  successMessage = '';
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.token = this.route.snapshot.queryParams['token'] || '';
    if (!this.token) {
      this.errorMessage = 'Token inválido o expirado.';
    }
  }

  onSubmit() {
    if (this.newPassword !== this.confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden.';
      return;
    }
    if (this.newPassword.length < 8) {
      this.errorMessage = 'La contraseña debe tener mínimo 8 caracteres.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.authService.resetPassword({
      token: this.token,
      newPassword: this.newPassword,
      confirmPassword: this.confirmPassword
    }).subscribe({
      next: (response) => {
        if (response.success) {
          this.successMessage = response.message;
          setTimeout(() => this.router.navigate(['/auth/login']), 3000);
        } else {
          this.errorMessage = response.message;
        }
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Error al restablecer la contraseña';
        this.isLoading = false;
      }
    });
  }
}