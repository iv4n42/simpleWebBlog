import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../../shared/services/domain/post/post.service';
import { Post } from '../../../shared/models/domain/post/Post';
import { Observable, Subject, switchMap, takeUntil } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-post-read',
    standalone: true,
    imports: [MatCardModule, CommonModule],
    templateUrl: './post-read.component.html',
    styleUrl: './post-read.component.scss',
})
export class PostReadComponent implements OnDestroy {
    post$!: Observable<Post>;
    private _destroy$: Subject<void> = new Subject();

    constructor(
        private _route: ActivatedRoute,
        private _postService: PostService
    ) {
        this.post$ = this._route.params
            .pipe(
                switchMap((params) => {
                    return this._postService.getPost(params['postId']);
                }),
                takeUntil(this._destroy$)
            );
    }

    ngOnDestroy(): void {
        this._destroy$.next();
        this._destroy$.complete();
    }
}
