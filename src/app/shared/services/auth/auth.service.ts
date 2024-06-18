import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { API_ROUTES, BASE_API_URL } from '../../api.routes';
import { UserSignup } from '../../models/auth/user-signup';
import { User } from '../../models/auth/user';
import { UserSignin } from '../../models/auth/user-signin';

@Injectable({
    providedIn: 'root',
})
export class AuthService implements OnInit {
    private jwt!: string | null;

    successfulSignin: Subject<void> = new Subject();
    signupValues: Subject<UserSignup> = new Subject();
    signinValues: Subject<UserSignin> = new Subject();

    constructor(private httpClient: HttpClient) {}

    ngOnInit(): void {
        this.jwt = localStorage.getItem('userJWT');
    }

    getUserToken() {
        return this.jwt;
    }

    setUserToken(token: string) {
        this.jwt = token;
        localStorage.setItem('userJWT', this.jwt);
    }

    emitSuccessfulSigninEvent() {
        this.successfulSignin.next();
    }

    signup(userData: UserSignup): Observable<object> {
        return this.httpClient.post(
            `${BASE_API_URL}/${API_ROUTES.auth.signup}`,
            userData
        );
    }

    signin(userData: UserSignin): Observable<object> {
        const jwt = this.httpClient.post<object>(
            `${BASE_API_URL}/${API_ROUTES.auth.signin}`,
            userData
        );
        return jwt;
    }
}