import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { inject } from '@angular/core';

export const accountGuard: CanActivateFn = (route, state): boolean => {
    if (inject(AuthService).isUserAuthenticated()) {
        inject(Router).navigate(['/posts']);
        return false;
    }

    return true;
};
