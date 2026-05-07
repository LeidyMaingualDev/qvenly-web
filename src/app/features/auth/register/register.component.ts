import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/coreAuth/services/auth.service';
import { RegisterRequest } from '../../../core/coreAuth/models/auth.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registerData: RegisterRequest = {
    name: '',
    lastName: '',
    email: '',
    password: '',
    documentNumber: '',
    documentType: 'CC',
    phoneNumber: ''
  };

  errorMessage = '';
  successMessage = '';
  isLoading = false;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.authService.register(this.registerData).subscribe({
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
        this.errorMessage = err.error?.message || 'Error al registrarse';
        this.isLoading = false;
      }
    });
  }
}