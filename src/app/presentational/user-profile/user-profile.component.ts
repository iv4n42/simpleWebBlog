import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { UploadService } from '../../shared/services/upload/upload.service';
import { Observable, Subject, exhaustMap, filter, map, takeUntil } from 'rxjs';
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
export class UserProfileComponent implements OnInit, OnDestroy {
    private _destroy$: Subject<void> = new Subject();
    user$: Observable<User>;
    pfp$: Subject<SafeUrl | string> = new Subject();

    pfp: SafeUrl | string = '../../../assets/user-pfp-placeholder.jpg';

    constructor(
        private _uploadService: UploadService,
        private _userService: UserService,
        private _authService: AuthService,
        private _domSanitizer: DomSanitizer
    ) {
        this.user$ = this._userService.getUser(this._authService.userId!);
    }

    ngOnInit(): void {
        this._userService
            .getUserPfp(this._authService.userId!)
            .pipe(
                filter((base64Pfp) => {
                    return base64Pfp.length !== 0;
                }),
                map((base64Pfp) => {
                    const pictureBlob: Blob = base64ToBlob(
                            base64Pfp,
                            'image/jpeg'
                        ),
                        pictureBlobUrl: SafeUrl =
                            this._domSanitizer.bypassSecurityTrustUrl(
                                URL.createObjectURL(pictureBlob)
                            );

                    return pictureBlobUrl;
                })
            )
            .subscribe({
                next: (pfpUrl: SafeUrl) => {
                    this.pfp = pfpUrl;
                },
            });

        this._uploadService.uploadPictureSubject
            .pipe(
                exhaustMap((picture: File) => {
                    return this._uploadService.uploadProfilePicture(
                        picture,
                        this._authService.userId!
                    );
                }),
                map((base64Pfp: string) => {
                    const pictureBlob = base64ToBlob(base64Pfp, 'image/jpeg'),
                        pictureBlobUrl =
                            this._domSanitizer.bypassSecurityTrustUrl(
                                URL.createObjectURL(pictureBlob)
                            );

                    return pictureBlobUrl;
                }),
                takeUntil(this._destroy$)
            )
            .subscribe({
                next: (pfpUrl: SafeUrl) => {
                    this.pfp = pfpUrl;
                },
            });
    }

    ngOnDestroy(): void {
        this._destroy$.next();
        this._destroy$.complete();
    }

    onSelectProfilePicture(files: FileList | null) {
        if (!files || !files.length) return;

        const picture: File = files[0];
        this._uploadService.uploadPictureSubject.next(picture);
    }
}
