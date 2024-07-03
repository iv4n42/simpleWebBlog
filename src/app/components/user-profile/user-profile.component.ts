import { Component, Input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { UploadService } from '../../shared/services/upload/upload.service';
import { EMPTY, Observable, catchError, empty, exhaustMap, forkJoin, tap } from 'rxjs';
import { User } from '../../shared/models/auth/user';
import { HttpErrorResponse, HttpResponseBase } from '@angular/common/http';
import { UserService } from '../../shared/services/domain/user/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../shared/services/auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-user-page',
    standalone: true,
    imports: [MatTabsModule, MatCardModule, CommonModule],
    templateUrl: './user-profile.component.html',
    styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent implements OnInit {
    user$: Observable<User>;

    constructor(
        private _uploadService: UploadService,
        private _userService: UserService,
        private _authService: AuthService,
        private _snackBar: MatSnackBar
    ) {
        this.user$ = this._userService.getUser(this._authService.userId!);
    }

    ngOnInit(): void {
        this._uploadService.uploadPictureSubject
            .pipe(
                exhaustMap((file: File) => {
                    return this._uploadService
                        .uploadProfilePicture(file, this._authService.userId!)
                        .pipe(
                            catchError((errResponse: HttpErrorResponse) => {
                                this._snackBar.open(
                                    errResponse.error.message,
                                    'close'
                                );
                                return EMPTY;
                            })
                        );
                })
            )
            .subscribe({
                next: (value) => {
                    console.log(value);
                },
            });
    }

    onSelectProfilePicture(files: FileList | null) {
        if (!files || !files.length) return;

        const picture: File = files[0];
        this._uploadService.uploadPictureSubject.next(picture);
    }
}
