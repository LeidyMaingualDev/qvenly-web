import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../../core/coreAuth/services/auth.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit {
  isMenuOpen = false;
  isAuthenticated = false;
  userName = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.isAuthenticated = this.authService.isAuthenticated();
    this.userName = this.authService.getUserName() || '';
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  onLogout() {
    this.authService.logout().subscribe({
      next: () => {
        this.authService.clearSession();
        this.isAuthenticated = false;
        this.userName = '';
        this.router.navigate(['/']);
      },
      error: () => {
        this.authService.clearSession();
        this.isAuthenticated = false;
        this.router.navigate(['/']);
      }
    });
  }
}