import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/coreAuth/services/auth.service';
import { LoginRequest } from '../../../core/coreAuth/models/auth.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginData: LoginRequest = {
    email: '',
    password: '',
    rememberMe: false
  };

  errorMessage = '';
  isLoading = false;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.isLoading = true;
    this.errorMessage = '';

    this.authService.login(this.loginData).subscribe({
      next: (response) => {
        if (response.success) {
          this.authService.saveToken(response.data.token, response.data.refreshToken);
          this.authService.saveUserInfo(response.data.name, response.data.email, response.data.role);
          this.router.navigate(['/']);
        } else {
          this.errorMessage = response.message;
        }
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Error al iniciar sesión';
        this.isLoading = false;
      }
    });
  }
}