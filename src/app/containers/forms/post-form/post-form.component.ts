import { Component, OnInit } from '@angular/core';
import {
    FormControl,
    ReactiveFormsModule,
    FormGroup,
    FormBuilder,
    Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { MatButtonModule } from '@angular/material/button';
import { PostService } from '../../../shared/services/domain/post/post.service';
import { CreatePost } from '../../../shared/models/domain/post/CreatePost';
import { exhaustAll, exhaustMap, map } from 'rxjs';
import { MatCardModule } from '@angular/material/card';

@Component({
    selector: 'app-post-form',
    standalone: true,
    imports: [
        MatFormFieldModule,
        MatCardModule,
        MatInputModule,
        CdkTextareaAutosize,
        MatButtonModule,
        ReactiveFormsModule,
    ],
    templateUrl: './post-form.component.html',
    styleUrl: './post-form.component.scss',
})
export class PostFormComponent implements OnInit {
    postForm!: FormGroup;

    constructor(private _postService: PostService, private _fb: FormBuilder) {}

    ngOnInit(): void {
        this._postService.postValues
            .pipe(
                exhaustMap((newPost) => {
                    return this._postService.createPost(newPost);
                })
            )
            .subscribe({});

        this.postForm = this._fb.group({
            title: ['', [Validators.required]],
            content: ['', [Validators.required]],
        });
    }

    onSubmitPostBtnClick() {
        const newPost: CreatePost = {
            title: this.postForm.get('title')?.value as string,
            content: this.postForm.get('content')?.value as string,
        };

        this._postService.postValues.next(newPost);
    }
}
