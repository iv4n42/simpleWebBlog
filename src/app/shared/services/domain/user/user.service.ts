import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../../models/auth/user';
import { API_ROUTES, BASE_API_URL } from '../../../api.routes';
import { EMPTY, Observable, catchError } from 'rxjs';
import { ErrorNotificationService } from '../../error-notification/error-notification.service';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    constructor(
        private _httpClient: HttpClient,
        private _errorNotificationService: ErrorNotificationService
    ) {}

    getUser(userId: string): Observable<User> {
        return this._httpClient
            .get<User>(`${BASE_API_URL}/${API_ROUTES.user}/${userId}`)
            .pipe(
                catchError((err) => {
                    this._errorNotificationService.notifyError(err);
                    return EMPTY;
                })
            );
    }
}
