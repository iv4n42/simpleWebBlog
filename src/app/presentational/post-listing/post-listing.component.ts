import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../shared/services/domain/user/user.service';
import { Observable, Subject, switchMap, takeUntil } from 'rxjs';
import { Post } from '../../shared/models/domain/post/Post';
import { PostService } from '../../shared/services/domain/post/post.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
    selector: 'app-post-page',
    standalone: true,
    imports: [
        MatGridListModule,
        MatCardModule,
        MatDividerModule,
        MatIconModule,
        CommonModule,
    ],
    templateUrl: './post-listing.component.html',
    styleUrl: './post-listing.component.scss',
})
export class PostListingComponent implements OnInit, OnDestroy {
    private _destroy$: Subject<void> = new Subject();

    posts$!: Observable<Post[]>;

    constructor(private _postService: PostService, private _router: Router) {
        this.posts$ = this._postService.getAllPosts();
    }

    ngOnInit() {
        this._postService.getPostValues.subscribe({
            next: (postId) => {
                this._router.navigate([`post-read/${postId}`]);
            },
        });
    }

    ngOnDestroy(): void {
        this._destroy$.next();
        this._destroy$.complete();
    }

    onPostCardClick(postId: string) {
        this._postService.getPostValues.next(postId);
    }
}
