import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpStatusCode,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { EMPTY, Observable, catchError, throwError } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
import { API_ROUTES } from '../../api.routes';
import { ErrorNotificationService } from '../../services/error-notification/error-notification.service';

@Injectable()
export class UnauthorizedInterceptor implements HttpInterceptor {
    private readonly excludedRoutes: string[] = [
        ...Object.values(API_ROUTES.auth),
    ];
    constructor(
        private _router: Router,
        private _errorNotificationService: ErrorNotificationService,
        private _authService: AuthService
    ) {}

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        if (this.isExcludedUrl(request.url)) return next.handle(request);

        return next.handle(request).pipe(
            catchError((errResponse: HttpErrorResponse) => {
                if (errResponse.status === HttpStatusCode.Unauthorized) {
                    this._errorNotificationService.notifyError(
                        errResponse,
                        () => {
                            this._authService.logout();
                            this._router.navigate(['/signin']);
                        },
                        'Your session has expired, please sign in once again'
                    );
                }
                return throwError(() => errResponse);
            })
        );
    }

    private isExcludedUrl(url: string): boolean {
        return this.excludedRoutes.some((route) => url.includes(route));
    }
}
