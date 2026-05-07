import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import {
  LoginRequest,
  RegisterRequest,
  ForgotPasswordRequest,
  AuthResponse,
  ApiResponse
} from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) {}

  login(request: LoginRequest): Observable<ApiResponse<AuthResponse>> {
    return this.http.post<ApiResponse<AuthResponse>>(`${this.apiUrl}/login`, request);
  }

  register(request: RegisterRequest): Observable<ApiResponse<AuthResponse>> {
    return this.http.post<ApiResponse<AuthResponse>>(`${this.apiUrl}/register`, request);
  }

  forgotPassword(request: ForgotPasswordRequest): Observable<ApiResponse<void>> {
    return this.http.post<ApiResponse<void>>(`${this.apiUrl}/forgot-password`, request);
  }

  logout(): Observable<ApiResponse<void>> {
    const token = this.getToken();
    return this.http.post<ApiResponse<void>>(`${this.apiUrl}/logout`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  saveToken(token: string, refreshToken: string): void {
    localStorage.setItem('token', token);
    localStorage.setItem('refreshToken', refreshToken);
  }

  saveUserInfo(name: string, email: string, role: string): void {
    localStorage.setItem('name', name);
    localStorage.setItem('email', email);
    localStorage.setItem('role', role);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  clearSession(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    localStorage.removeItem('role');
  }
}