import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_ROUTES, BASE_API_URL } from '../../api.routes';
import { UserSignup } from '../../models/auth/user-signup';
import { UserSignin } from '../../models/auth/user-signin';
import { User } from '../../models/auth/user';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(private httpClient: HttpClient) {}

    signup(userInfo: UserSignup): Observable<object> {
        return this.httpClient.post(
            `${BASE_API_URL}/${API_ROUTES.auth.signup}`,
            userInfo
        );
    }

    signin(userInfo: UserSignin): Observable<User> {
        const user = this.httpClient.post<User>(
            `${BASE_API_URL}/${API_ROUTES.auth.signin}`,
            userInfo
        );
        return user;
    }
}
