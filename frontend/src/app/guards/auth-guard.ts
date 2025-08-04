import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean | UrlTree {
    const token = localStorage.getItem('token'); // Ajusta si usas otro lugar para guardar token
    if (token) {
      return true;
    }
    // No autenticado: redirigir a login
    return this.router.createUrlTree(['/login']);
  }
}
