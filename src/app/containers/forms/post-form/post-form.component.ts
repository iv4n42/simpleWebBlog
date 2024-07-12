import { Component, OnDestroy, OnInit } from '@angular/core';
import {
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
import { Subject, exhaustMap, takeUntil } from 'rxjs';
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
export class PostFormComponent implements OnInit, OnDestroy {
    private _destroy$: Subject<void> = new Subject();
    postForm!: FormGroup;

    constructor(private _postService: PostService, private _fb: FormBuilder) {}

    ngOnInit(): void {
        this._postService.publishPostValues
            .pipe(
                exhaustMap((newPost) => {
                    return this._postService.createPost(newPost, false);
                }),
                takeUntil(this._destroy$)
            )
            .subscribe({});

        this._postService.postAsDraftValues
            .pipe(
                exhaustMap((newPost) => {
                    return this._postService.createPost(newPost, true);
                }),
                takeUntil(this._destroy$)
            )
            .subscribe({});

        this.postForm = this._fb.group({
            title: ['', [Validators.required]],
            content: ['', [Validators.required]],
        });
    }

    ngOnDestroy(): void {
        this._destroy$.next();
        this._destroy$.complete();
    }

    onPublishPostBtnClick() {
        const newPost: CreatePost = this._getPostFromForm();
        this._postService.publishPostValues.next(newPost);
    }

    onSavePostAsDraftBtnClick() {
        const newPost: CreatePost = this._getPostFromForm();
        this._postService.postAsDraftValues.next(newPost);
    }

    private _getPostFromForm(): CreatePost {
        return {
            title: this.postForm.get('title')?.value as string,
            content: this.postForm.get('content')?.value as string,
        };
    }
}
