import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { getTokenFromCookie } from '../utils/cookie';

export const authGuard: CanActivateFn = (route, state) => {
  const token = getTokenFromCookie();
  console.log('Guard: ' + String(token));

  if (token) {
    console.log('returned true');
    return true; // User is authenticated
  } else {
    console.log('returned false');
    const router = inject(Router);
    return router.parseUrl('login'); // Redirect to login page if not authenticated
  }
};
