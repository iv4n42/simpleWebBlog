import { Component, OnInit } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-post-page',
    standalone: true,
    imports: [
        MatGridListModule,
        MatCardModule,
        MatDividerModule,
        MatIconModule,
    ],
    templateUrl: './post-listing.component.html',
    styleUrl: './post-listing.component.scss',
})
export class PostListingComponent implements OnInit {
    ngOnInit() {
        // this._httpService.getPosts(this.getAll).subscribe((data : any ) =>{
        //   this.allPosts = data
        // })
    }
}
