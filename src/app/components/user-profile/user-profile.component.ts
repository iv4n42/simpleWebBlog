import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { UploadService } from '../../shared/services/upload/upload.service';
import { Observable, exhaustMap, map } from 'rxjs';
import { User } from '../../shared/models/auth/user';
import { UserService } from '../../shared/services/domain/user/user.service';
import { AuthService } from '../../shared/services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { base64ToBlob } from '../../utils/file-management';

@Component({
    selector: 'app-user-page',
    standalone: true,
    imports: [MatTabsModule, MatCardModule, CommonModule],
    templateUrl: './user-profile.component.html',
    styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent implements OnInit {
    user$: Observable<User>;
    profilePictureUrl: string | SafeUrl = '../../../assets/162094261.jfif';

    constructor(
        private _uploadService: UploadService,
        private _userService: UserService,
        private _authService: AuthService,
        private _domSanitizer: DomSanitizer
    ) {
        this.user$ = this._userService.getUser(this._authService.userId!);
    }

    ngOnInit(): void {
        this._uploadService.uploadPictureSubject
            .pipe(
                exhaustMap((picture: File) => {
                    return this._uploadService.uploadProfilePicture(
                        picture,
                        this._authService.userId!
                    );
                }),
                map((base64Picture: string) => {
                    const pictureBlob = base64ToBlob(
                            base64Picture,
                            'image/jpeg'
                        ),
                        pictureBlobUrl =
                            this._domSanitizer.bypassSecurityTrustUrl(
                                URL.createObjectURL(pictureBlob)
                            );

                    return pictureBlobUrl;
                })
            )
            .subscribe({
                next: (pictureUrl: SafeUrl) => {
                    this.profilePictureUrl = pictureUrl;
                },
            });
    }

    onSelectProfilePicture(files: FileList | null) {
        if (!files || !files.length) return;

        const picture: File = files[0];
        this._uploadService.uploadPictureSubject.next(picture);
    }
}
