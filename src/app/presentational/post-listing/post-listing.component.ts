import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../shared/services/domain/user/user.service';
import { Observable, Subject, Subscription, switchMap, takeUntil } from 'rxjs';
import { Post } from '../../shared/models/domain/post/Post';
import { PostService } from '../../shared/services/domain/post/post.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SearchService } from '../../shared/services/search/search.service';

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
    filteredPosts? : Post[];
    posts? : Post[];
    searchSub! : Subscription;

    constructor(private _postService: PostService, private _router: Router,
                private _searchService : SearchService) {}

    ngOnInit() {
        this._postService.getPostValues.subscribe({
            next: (postId) => {
                this._router.navigate([`post-read/${postId}`]);
            },
        });
        this._postService.getAllPosts().subscribe(posts => {
            this.posts = posts
            this.filteredPosts = this.posts
            let titles = []
            for( let post of posts){
                titles.push(post.title)
            }
            this._searchService.searchOptions$.next(titles)
            this._searchService.allOptions$.next(titles)
        });
        this.searchSub = this._searchService.finalOption$.subscribe(title => {
            this.filteredPosts = this.posts?.filter( post => post.title.includes(title))
        });
    }

    ngOnDestroy(): void {
        this._destroy$.next();
        this._destroy$.complete();
        this.searchSub.unsubscribe();
        this._searchService.finalOption$.next("");
        this._searchService.allOptions$.next([]);
        this._searchService.searchOptions$.next([]);    
    }

    onPostCardClick(postId: string) {
        this._postService.getPostValues.next(postId);
    }
}
