import {
    Component,
    OnDestroy,
    OnInit,
} from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
    EMPTY,
    Subscription,
    catchError,
    switchMap,
} from 'rxjs';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserSignin } from '../../../shared/models/auth/user-signin';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-signin-form',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatCardModule,
    ],
    templateUrl: './signin-form.component.html',
    styleUrl: './signin-form.component.scss',
})
export class SigninFormComponent implements OnInit, OnDestroy {
    signinForm!: FormGroup;
    authServiceSubscription!: Subscription;
    passwordPattern: string =
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$';

    constructor(
        private _fb: FormBuilder,
        private _authService: AuthService,
        private _router: Router,
        private _snackBar: MatSnackBar
    ) {}

    ngOnDestroy(): void {
        this.authServiceSubscription.unsubscribe();
    }

    ngOnInit(): void {
        this.signinForm = this._fb.group({
            username: [
                '',
                [Validators.required, Validators.pattern('^(?!\\s*$).+')],
            ],
            password: [
                '',
                [Validators.required, Validators.pattern(this.passwordPattern)],
            ],
        });

        this.authServiceSubscription = this._authService.signinValues
            .pipe(
                switchMap((userData: UserSignin) => {
                    return this._authService.signin(userData).pipe(
                        catchError((errResponse: HttpErrorResponse) => {
                            const snackBarRef = this._snackBar.open(
                                errResponse.error.message,
                                'close'
                            );

                            const usernameControl =
                                    this.signinForm.get('username'),
                                passwordControl =
                                    this.signinForm.get('password');

                            snackBarRef.onAction().subscribe(() => {
                                passwordControl?.reset();
                                usernameControl?.reset();
                            });

                            return EMPTY;
                        })
                    );
                })
            )
            .subscribe({
                next: (result: any) => {
                    this._authService.setUserToken(result.userToken);
                    this._authService.emitSuccessfulSigninEvent();
                    this._router.navigate(['']);
                },
            });
    }

    onSigninBtnClick() {
        const userInfo: UserSignin = {
            username: this.signinForm.get('username')?.value as string,
            password: this.signinForm.get('password')?.value as string,
        };

        this._authService.signinValues.next(userInfo);
    }
}
