import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, Subject, catchError } from 'rxjs';
import { API_ROUTES, BASE_API_URL } from '../../api.routes';

@Injectable({
    providedIn: 'root',
})
export class UploadService {
    uploadFilesSubject: Subject<FileList> = new Subject();
    uploadPictureSubject: Subject<File> = new Subject();

    constructor(private _httpClient: HttpClient) {}

    uploadProfilePicture(picture: File, userId: string) {
        return this._httpClient
            .post(
                `${BASE_API_URL}/${API_ROUTES.user}/${userId}/changeProfilePicture`,
                picture
            )
            .pipe(
                catchError((errResponse) => {
                    console.log(errResponse);
                    return EMPTY;
                })
            );
    }
}
