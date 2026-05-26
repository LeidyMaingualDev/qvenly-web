import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../core/coreAuth/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-google-callback',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './google-callback.component.html',
  styleUrl: './google-callback.component.css'
})
export class GoogleCallbackComponent implements OnInit {

  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const name = this.route.snapshot.queryParams['name'];
    const email = this.route.snapshot.queryParams['email'];
    const role = this.route.snapshot.queryParams['role'];

    if (name && email && role) {
      this.authService.saveUserInfo(name, email, role);
      this.router.navigate(['/dashboard']);
    } else {
      this.errorMessage = 'Error al autenticar con Google';
      setTimeout(() => this.router.navigate(['/auth/login']), 3000);
    }
  }
}