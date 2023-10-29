import { CookieService } from 'ngx-cookie-service';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

const isLoggedIn = () => {
  const cookieService = inject(CookieService);
  const isEmpIdSet = cookieService.check('empId');
  const isNameSet = cookieService.check('name');
  // console.log({ isEmpIdSet, isNameSet });
  return isEmpIdSet && isNameSet;
};

export const authGuardGuard: CanActivateFn = (route, state) => {
  const is_logged_in = isLoggedIn();

  if (is_logged_in === false) {
    const router = inject(Router);
    router.navigate(['/signin']);
  }

  // console.log('running guard', { is_logged_in });
  return isLoggedIn();
};
