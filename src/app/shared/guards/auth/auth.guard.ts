import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

export const authGuard: CanActivateFn = (route, state): boolean => {
    if (!inject(AuthService).isUserAuthenticated()) {
        inject(Router).navigate(['signin']);
        return false;
    }

    return true;
};
