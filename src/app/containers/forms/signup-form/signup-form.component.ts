import { Component, OnInit, Output } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserSignup } from '../../../shared/models/auth/user-signup';
import { exhaustMap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-signup-form',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatDatepickerModule,
        MatCardModule,
    ],
    templateUrl: './signup-form.component.html',
    styleUrl: './signup-form.component.scss',
})
export class SignupFormComponent implements OnInit {
    signUpForm!: FormGroup;
    passwordPattern: string =
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$';

    @Output() signupBtnClickEvent: EventEmitter<void> = new EventEmitter();

    constructor(
        private _fb: FormBuilder,
        private _authService: AuthService,
        private _snackBar: MatSnackBar
    ) {}

    ngOnInit(): void {
        this.signUpForm = this._fb.group({
            username: [
                '',
                [Validators.required, Validators.pattern('^(?!\\s*$).+')],
            ],
            email: ['', [Validators.required, Validators.email]],
            password: [
                '',
                [Validators.required, Validators.pattern(this.passwordPattern)],
            ],
            passwordConfirmation: [
                '',
                [Validators.required, Validators.pattern(this.passwordPattern)],
            ],
            firstname: ['', [Validators.required, Validators.pattern('')]],
            lastname: ['', [Validators.required, Validators.pattern('')]],
            dateOfBirth: ['', [Validators.required]],
            address: [''],
        });

        this._authService
            .getUserSignupInfo()
            .pipe(
                exhaustMap((userData: UserSignup) => {
                    return this._authService.signup(userData);
                })
            )
            .subscribe({
                next: (result) => {
                    console.log(result);
                },
                error: (error: HttpErrorResponse) => {
                    console.log(
                        `Error on form submission ${error.message} with status ${error.status}`
                    );
                },
                complete: () => {
                    this.signUpForm.reset();
                },
            });
    }

    onSignupBtnClick() {
        const passwordControl = this.signUpForm.get('password'),
            passwordConfirmationControl = this.signUpForm.get(
                'passwordConfirmation'
            ),
            password = passwordControl?.value as string,
            passwordConfirmation = passwordConfirmationControl?.value as string;

        if (password !== passwordConfirmation) {
            const snackBarRef = this._snackBar.open(
                'The passwords do not match.',
                'close'
            );
            snackBarRef.onAction().subscribe(() => {
                passwordControl?.reset();
                passwordConfirmationControl?.reset();
            });
        }

        const userInfo: UserSignup = {
            username: this.signUpForm.get('username')?.value as string,
            email: this.signUpForm.get('email')?.value as string,
            password: this.signUpForm.get('password')?.value as string,
            firstname: this.signUpForm.get('firstname')?.value as string,
            lastname: this.signUpForm.get('lastname')?.value as string,
            dateOfBirth: this.signUpForm.get('dateOfBirth')?.value as Date,
            address: this.signUpForm.get('address')?.value as string,
        };

        this._authService.submitUserSignupInfo(userInfo);
    }
}
