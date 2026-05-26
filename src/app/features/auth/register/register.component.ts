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

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit() {
    this.isLoading = true;
    this.errorMessage = '';

    this.authService.register(this.registerData).subscribe({
      next: (response) => {
        if (response.success) {
          this.successMessage = '📧 Registro exitoso. Revisa tu correo para confirmar tu cuenta.';
        } else {
          this.errorMessage = response.message;
        }
        this.isLoading = false;
      },
      error: (err) => {
        if (err.error?.data) {
          const campos = Object.entries(err.error.data)
            .map(([campo, mensaje]) => `• ${mensaje}`)
            .join('\n');
          this.errorMessage = campos;
        } else {
          this.errorMessage = err.error?.message || 'Error al registrarse';
        }
        this.isLoading = false;
      }
    });
  }
}