import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { firstValueFrom } from 'rxjs';

export const IsWaiterGuard: CanMatchFn = async () =>
  // route: Route,
  // segments: UrlSegment[],
  {
    const authService: AuthService = inject(AuthService);
    const router: Router = inject(Router);

    const isAuthenticated = await firstValueFrom(authService.checkAuthStatus());
    const userRoleId = authService.user()?.role_id;
    if (isAuthenticated && userRoleId === 4) return true;
    router.navigateByUrl('/');

    //   console.log({isAuthenticated});
    return true;
  };

export default IsWaiterGuard;
