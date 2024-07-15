import { Component, OnInit } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../shared/services/domain/user/user.service';
import { Observable } from 'rxjs';
import { Post } from '../../shared/models/domain/post/Post';
import { PostService } from '../../shared/services/domain/post/post.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-post-page',
    standalone: true,
    imports: [
        MatGridListModule,
        MatCardModule,
        MatDividerModule,
        MatIconModule,
        CommonModule
    ],
    templateUrl: './post-listing.component.html',
    styleUrl: './post-listing.component.scss',
})
export class PostListingComponent implements OnInit {
    posts$!: Observable<Post[]>;
    constructor(private _postService: PostService) {
        this.posts$ = this._postService.getAllPosts();
    }

    ngOnInit() {}
}
