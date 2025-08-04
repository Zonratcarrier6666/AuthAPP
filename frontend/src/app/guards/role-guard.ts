import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean | UrlTree {
    const expectedRoles: string[] = route.data['roles'];
    const userDetail = this.authService.getUserDetail();

    if (!userDetail) {
      alert('No estás autenticado.');
      return this.router.createUrlTree(['/login']);
    }

    // Comprobar si el usuario tiene al menos un rol esperado
    const hasRole = userDetail.roles.some((role: string) => expectedRoles.includes(role));

    if (hasRole) {
      return true;
    }

    alert('No tienes permiso para acceder a esta ruta');
    return this.router.createUrlTree(['/']);
  }
}
