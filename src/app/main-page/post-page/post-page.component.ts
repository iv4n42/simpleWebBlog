import { Component,OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import { error } from 'console';


@Component({
  selector: 'app-post-page',
  standalone: true,
  imports: [MatGridListModule,
            MatCardModule,
            MatDividerModule,
            MatIconModule
  ],
  templateUrl: './post-page.component.html',
  styleUrl: './post-page.component.scss'
})
export class PostPageComponent implements OnInit {
  constructor(private _httpService : HttpService){}
  allPosts :any= [];
  getAll = "posts";
  ngOnInit() {
    this._httpService.getPosts(this.getAll).subscribe((data : any ) =>{
      this.allPosts = data
    })
  }
}
