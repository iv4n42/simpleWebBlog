import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_ROUTES, BASE_API_URL } from '../../api.routes';
import { UserSignup } from '../../models/auth/user-signup';
import { User } from '../../models/auth/user';
import { UserSignin } from '../../models/auth/user-signin';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private signupEvent: EventEmitter<UserSignup> = new EventEmitter();

    constructor(private httpClient: HttpClient) {}

    submitUserSignupInfo(userData: UserSignup): void {
        this.signupEvent.emit(userData);
    }

    getUserSignupInfo(): Observable<UserSignup> {
        return this.signupEvent.asObservable();
    }

    signup(userData: UserSignup): Observable<object> {
        return this.httpClient.post(
            `${BASE_API_URL}/${API_ROUTES.auth.signup}`,
            userData
        );
    }

    signin(userData: UserSignin): Observable<string> {
        const jwt = this.httpClient.post<string>(
            `${BASE_API_URL}/${API_ROUTES.auth.signin}`,
            userData
        );
        return jwt;
    }
}
