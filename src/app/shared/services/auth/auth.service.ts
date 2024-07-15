import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
    EMPTY,
    EmptyError,
    ErrorNotification,
    Observable,
    Subject,
    catchError,
} from 'rxjs';
import { API_ROUTES, BASE_API_URL } from '../../api.routes';
import { UserSignup } from '../../models/auth/user-signup';
import { UserSignin } from '../../models/auth/user-signin';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ErrorNotificationService } from '../error-notification/error-notification.service';
import { AbstractControl, FormControl } from '@angular/forms';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    userId: string | null = null;

    successfulSigninValue: Subject<void> = new Subject();
    logoutValue: Subject<void> = new Subject();
    signupValues: Subject<UserSignup> = new Subject();
    signinValues: Subject<UserSignin> = new Subject();

    constructor(
        private _httpClient: HttpClient,
        private _jwtHelperService: JwtHelperService,
        private _errorNotificationService: ErrorNotificationService
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
        this.successfulSigninValue.next();
    }

    signup(userData: UserSignup, onError: () => void): Observable<object> {
        return this._httpClient
            .post(`${BASE_API_URL}/${API_ROUTES.auth.signup}`, userData)
            .pipe(
                catchError((errResponse: HttpErrorResponse) => {
                    this._errorNotificationService.notifyError(errResponse, onError);
                    return EMPTY;
                })
            );
    }

    signin(userData: UserSignin, onError: () => void): Observable<object> {
        const jwt = this._httpClient
            .post<object>(`${BASE_API_URL}/${API_ROUTES.auth.signin}`, userData)
            .pipe(
                catchError((errResponse: HttpErrorResponse) => {
                    this._errorNotificationService.notifyError(errResponse, onError);
                    return EMPTY;
                })
            );
        return jwt;
    }

    logout(): void {
        localStorage.removeItem('userJWT');
        this.userId = null;
        this.logoutValue.next();
    }

    validatePasswordConfirmation(
        password: string,
        passwordConfirmation: string,
        onError: () => void
    ): boolean {
        if (password !== passwordConfirmation) {
            const err = new Error('The passwords do not match');
            this._errorNotificationService.notifyError(err, onError);
            return false;
        }

        return true;
    }
}
