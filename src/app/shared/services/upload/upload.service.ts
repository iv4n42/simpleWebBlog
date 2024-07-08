import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, Subject, catchError, map } from 'rxjs';
import { API_ROUTES, BASE_API_URL } from '../../api.routes';
import { ErrorNotificationService } from '../error-notification/error-notification.service';

@Injectable({
    providedIn: 'root',
})
export class UploadService {
    uploadFilesSubject: Subject<FileList> = new Subject();
    uploadPictureSubject: Subject<File> = new Subject();

    constructor(
        private _httpClient: HttpClient,
        private _errorNotificationService: ErrorNotificationService
    ) {}

    uploadProfilePicture(picture: File, userId: string): Observable<string> {
        const formData = new FormData();
        formData.append('formPicture', picture, picture.name);

        return this._httpClient
            .post<string>(
                `${BASE_API_URL}/${API_ROUTES.user}/${userId}/changeProfilePicture`,
                formData
            )
            .pipe(
                catchError((errResponse: HttpErrorResponse) => {
                    this._errorNotificationService.notifyError(errResponse);
                    return EMPTY;
                })
            );
    }
}
