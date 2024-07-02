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
    userId: string | null = null;

    successfulSigninSubject: Subject<void> = new Subject();
    logoutSubject: Subject<void> = new Subject();
    signupValues: Subject<UserSignup> = new Subject();
    signinValues: Subject<UserSignin> = new Subject();

    constructor(
        private _httpClient: HttpClient,
        private _jwtHelperService: JwtHelperService
    ) {}

    isUserAuthenticated(): boolean {
        return localStorage.getItem('userJWT') !== null;
    }

    getUserToken(): string | null {
        return localStorage.getItem('userJWT');
    }

    getUserIdFromClaim(): void {
        const jwt = this.getUserToken();
        if (!jwt) return;

        this.userId = this._jwtHelperService.decodeToken(jwt)['Userid'];
    }

    onSuccessfulSignin(token: string) {
        localStorage.setItem('userJWT', token);
        this.getUserIdFromClaim();
        this.successfulSigninSubject.next();
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

    logout(): void {
        localStorage.removeItem('userJWT');
        this.userId = null;
        this.logoutSubject.next();
    }
}
