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
import { EMPTY, Observable, catchError } from 'rxjs';

@Injectable()
export class UnauthorizedInterceptor implements HttpInterceptor {
    constructor(private _snackBar: MatSnackBar, private _router: Router) {}

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError((errorResponse: HttpErrorResponse) => {
                if (errorResponse.status === HttpStatusCode.Unauthorized) {
                    const snackBarRef = this._snackBar.open(
                        'Your session has expired, please sign in once again',
                        'Close'
                    );
                    snackBarRef.onAction().subscribe(() => {
                        this._router.navigate(['/signin']);
                    });
                }
                return EMPTY;
            })
        );
    }
}