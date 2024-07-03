import {
    HttpClientJsonpModule,
    HttpErrorResponse,
    HttpStatusCode,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root',
})
export class ErrorNotificationService {
    constructor(private _snackBar: MatSnackBar) {}

    notifyError(
        err: Error | HttpErrorResponse,
        callback?: () => void,
        displayMessage?: string
    ) {
        if (err instanceof HttpErrorResponse) {
            switch (err.status) {
                case HttpStatusCode.NotFound:
                    displayMessage = 'The URI requested does not exist';
                    break;

                default:
                    displayMessage = displayMessage
                        ? displayMessage
                        : err.error.message;
                    break;
            }
        } else displayMessage = displayMessage ? displayMessage : err.message;

        const snackBarRef = this._snackBar.open(displayMessage!, 'Close');

        if (callback) {
            snackBarRef.onAction().subscribe(() => {
                callback();
            });
        }
    }
}
