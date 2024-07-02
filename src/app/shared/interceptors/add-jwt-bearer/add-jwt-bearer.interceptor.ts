import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';

@Injectable()
export class AddJwtBearerInterceptor implements HttpInterceptor {
    constructor(private _authService: AuthService) {}

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        if (!this._authService.isUserAuthenticated())
            return next.handle(request);

        const jwt = this._authService.getUserToken(),
            requestWithJwt = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${jwt}`,
                },
            });

        return next.handle(requestWithJwt);
    }
}
