import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ErrorNotificationService } from '../../error-notification/error-notification.service';
import { EMPTY, Observable, Subject, catchError } from 'rxjs';
import { API_ROUTES, BASE_API_URL } from '../../../api.routes';
import { CreatePost } from '../../../models/domain/post/CreatePost';
import { Post } from '../../../models/domain/post/Post';

@Injectable({
    providedIn: 'root',
})
export class PostService {
    successfulPostValue: Subject<void> = new Subject();
    publishPostValues: Subject<CreatePost> = new Subject();
    postAsDraftValues: Subject<CreatePost> = new Subject();

    constructor(
        private _httpClient: HttpClient,
        private _errorNotificationService: ErrorNotificationService
    ) {}

    getPost(postId: string): Observable<Post> {
        return this._httpClient
            .get<Post>(`${BASE_API_URL}/${API_ROUTES.post}/${postId}`)
            .pipe(
                catchError((errResponse: HttpErrorResponse) => {
                    this._errorNotificationService.notifyError(errResponse);
                    return EMPTY;
                })
            );
    }

    getAllPosts(): Observable<Post[]> {
        return this._httpClient
            .get<Post[]>(`${BASE_API_URL}/${API_ROUTES.post}`)
            .pipe(
                catchError((errResponse: HttpErrorResponse) => {
                    this._errorNotificationService.notifyError(errResponse);
                    return EMPTY;
                })
            );
    }

    createPost(post: CreatePost, asDraft: boolean): Observable<object> {
        return this._httpClient
            .post(`${BASE_API_URL}/${API_ROUTES.post}?asDraft=${asDraft}`, post)
            .pipe(
                catchError((errResponse: HttpErrorResponse) => {
                    this._errorNotificationService.notifyError(errResponse);
                    return EMPTY;
                })
            );
    }

    updatePost(postId: string, post: CreatePost): Observable<object> {
        return this._httpClient
            .patch<Post>(`${BASE_API_URL}/${API_ROUTES.post}/${postId}`, post)
            .pipe(
                catchError((errResponse: HttpErrorResponse) => {
                    this._errorNotificationService.notifyError(errResponse);
                    return EMPTY;
                })
            );
    }

    deletePost(postId: string): Observable<object> {
        return this._httpClient
            .delete(`${BASE_API_URL}/${API_ROUTES.post}/${postId}`)
            .pipe(
                catchError((errResponse: HttpErrorResponse) => {
                    this._errorNotificationService.notifyError(errResponse);
                    return EMPTY;
                })
            );
    }
}
