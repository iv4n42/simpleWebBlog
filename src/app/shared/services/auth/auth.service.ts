import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { API_ROUTES, BASE_API_URL } from '../../api.routes';
import { UserSignup } from '../../models/auth/user-signup';
import { UserSignin } from '../../models/auth/user-signin';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    successfulSignin: Subject<void> = new Subject();
    signupValues: Subject<UserSignup> = new Subject();
    signinValues: Subject<UserSignin> = new Subject();

    constructor(
        private _httpClient: HttpClient,
        private _jwtHelperService: JwtHelperService
    ) {}

    getUserToken(): string | null {
        const token = localStorage.getItem('userJWT');

        if (token) console.log(this._jwtHelperService.decodeToken(token));

        return token;
    }

    setUserToken(token: string) {
        localStorage.setItem('userJWT', token);
    }

    emitSuccessfulSigninEvent() {
        this.successfulSignin.next();
    }

    signup(userData: UserSignup): Observable<object> {
        return this._httpClient.post(
            `${BASE_API_URL}/${API_ROUTES.auth.signup}`,
            userData
        );
    }

    signin(userData: UserSignin): Observable<object> {
        const jwt = this._httpClient.post<object>(
            `${BASE_API_URL}/${API_ROUTES.auth.signin}`,
            userData
        );
        return jwt;
    }
}
