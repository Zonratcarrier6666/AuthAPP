import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { LoginRequest } from '../interfaces/login-request';
import { Observable, map } from 'rxjs';
import { AuthResponse } from '../interfaces/auth-response';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { RegisterRequest } from '../interfaces/register-request';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl: string = environment.apiUrl;
  private tokenKey = 'token';

  constructor(private http: HttpClient) {}

  register(data: RegisterRequest): Observable<AuthResponse> {
  return this.http.post<AuthResponse>(`${this.apiUrl}account/register`, data);
}



  login(data: LoginRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}account/login`, data)
      .pipe(
        map((response) => {
          if (response.isSuccess) {
            localStorage.setItem(this.tokenKey, response.token);
          }
          return response;
        })
      );
  }

  getUserDetail = () => {
  const token = this.getToken();
  if (!token) return null;

  const decodedToken: any = jwtDecode(token);

  // Maneja string o array
  const roles = decodedToken.role
    ? Array.isArray(decodedToken.role)
      ? decodedToken.role
      : [decodedToken.role]
    : [];

  const userDetail = {
    id: decodedToken.nameid,
    fullName: decodedToken.name,
    email: decodedToken.email,
    roles: roles
  };

  return userDetail;
};

  getUserDetailFromApi(): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}account/detail`);
  }

  isLoggedIn = (): boolean => {
    const token = this.getToken();
    if (!token) return false;
    return !this.isTokenExpired();
  };

  private isTokenExpired() {
    const token = this.getToken();
    if (!token) return true;
    const decoded = jwtDecode(token);
    const isTokenExpired = Date.now() >= decoded['exp']! * 1000;
    if (isTokenExpired) this.logout();
    return isTokenExpired;
  }

  logout = (): void => {
    localStorage.removeItem(this.tokenKey);
  };

  private getToken = (): string | null =>
    localStorage.getItem(this.tokenKey) || '';
}
