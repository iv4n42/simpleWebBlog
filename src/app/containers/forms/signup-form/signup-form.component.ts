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

@Component({
    selector: 'app-signup-form',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatDatepickerModule,
        MatCardModule
    ],
    templateUrl: './signup-form.component.html',
    styleUrl: './signup-form.component.scss',
})
export class SignupFormComponent implements OnInit {
    signUpForm!: FormGroup;
    // username: string = '';
    // email: string = '';

    @Output() signupBtnClickEvent: EventEmitter<void> = new EventEmitter();

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        this.signUpForm = this.fb.group({
            username: [
                '',
                [Validators.required, Validators.pattern('^(?!\\s*$).+')],
            ],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.pattern('')]],
            passwordConfirmation: [
                '',
                [Validators.required, Validators.pattern('')],
            ],
            firstname: ['', [Validators.required, Validators.pattern('')]],
            lastname: ['', [Validators.required, Validators.pattern('')]],
            birthDate: ['', [Validators.required]],
            address: ['', ],
        });
    }

    onSignupBtnClick() {
        this.signupBtnClickEvent.emit();
    }
}
