import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/coreAuth/services/auth.service';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent implements OnInit {
  userName = '';
  userEmail = '';
  userRole = '';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.userName = this.authService.getUserName() || '';
    this.userEmail = localStorage.getItem('email') || '';
    this.userRole = this.authService.getRole() || '';
  }
}