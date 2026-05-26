import { Component, OnInit } from '@angular/core';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
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
export class LoginComponent implements OnInit {

  loginData: LoginRequest = {
    email: '',
    password: '',
    rememberMe: false
  };

  errorMessage = '';
  successMessage = '';
  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const confirmed = this.route.snapshot.queryParamMap.get('confirmed');
    if (confirmed === 'true') {
      this.successMessage = '✅ Cuenta confirmada exitosamente. Ya puedes iniciar sesión.';
    }
  }

  onSubmit() {
    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.authService.login(this.loginData).subscribe({
      next: (response) => {
        if (response.success) {
          this.authService.saveUserInfo(
            response.data.name,
            response.data.email,
            response.data.role
          );
          this.router.navigate(['/dashboard']);
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

  onGoogleLogin() {
    window.location.href = 'http://localhost:8080/oauth2/authorization/google';
  }
}