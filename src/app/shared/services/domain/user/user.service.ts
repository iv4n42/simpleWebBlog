import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../../models/auth/user';
import { API_ROUTES, BASE_API_URL } from '../../../api.routes';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    constructor(private _httpClient: HttpClient) {}

    getUser(userId: string): Observable<User> {
        return this._httpClient.get<User>(
            `${BASE_API_URL}/${API_ROUTES.user}/${userId}`
        );
    }
}
