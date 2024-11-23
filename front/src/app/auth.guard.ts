import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { getUserRoleFromToken } from './token-utils';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('token'); // Obtiene el token
  console.log('Token desde localStorage:', token); // Imprime el token
  if (!token) {
      console.log('Token no encontrado, redirigiendo a /login');
      router.navigate(['/iniciar-sesion']); // Redirige a login si no hay token
      return false;
  }

  const userRole = getUserRoleFromToken(token); // Obtiene el rol desde el token
  const allowedRoles = route.data?.['role']; // Obtiene los roles permitidos de la ruta

  console.log('Rol del usuario:', userRole);
  console.log('Roles permitidos:', allowedRoles);

  if (allowedRoles && allowedRoles.includes(userRole)) {
      return true; // Acceso permitido
  }

  console.log('Acceso denegado, redirigiendo a /home');
  router.navigate(['/home']); // Redirige si no tiene el rol adecuado
  return false;
};



