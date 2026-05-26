import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/coreAuth/services/auth.service';

@Component({
  selector: 'app-confirm-email',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div class="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md text-center">

        <div class="flex items-center justify-center gap-2 mb-6">
          <img src="assets/images/logoQvenly.png" alt="Qvenly logo" class="h-8 w-auto">
          <span class="text-xl font-bold text-teal-500">Qvenly</span>
        </div>

        <!-- Cargando -->
        <div *ngIf="isLoading">
          <div class="text-4xl mb-4">⏳</div>
          <h2 class="text-xl font-bold text-gray-900 mb-2">Confirmando tu cuenta...</h2>
          <p class="text-gray-500 text-sm">Por favor espera un momento.</p>
        </div>

        <!-- Error -->
        <div *ngIf="!isLoading && !success">
          <div class="text-4xl mb-4">❌</div>
          <h2 class="text-xl font-bold text-gray-900 mb-2">Enlace no válido</h2>
          <p class="text-gray-500 text-sm mb-6">{{ errorMessage }}</p>
          <a href="/auth/login"
            class="bg-teal-500 text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-teal-600 transition-colors">
            Ir al inicio de sesión
          </a>
        </div>

      </div>
    </div>
  `
})
export class ConfirmEmailComponent implements OnInit {

  isLoading = true;
  success = false;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    const token = this.route.snapshot.queryParamMap.get('token');

    if (!token) {
      this.isLoading = false;
      this.errorMessage = 'El enlace de confirmación no es válido.';
      return;
    }

    this.authService.confirmEmail(token).subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response.success) {
          this.success = true;
          this.router.navigate(['/auth/login'], {
            queryParams: { confirmed: 'true' }
          });
        } else {
          this.errorMessage = response.message;
        }
      },
      error: () => {
        this.isLoading = false;
        this.errorMessage = 'El enlace de confirmación no es válido o ya fue usado.';
      }
    });
  }
}