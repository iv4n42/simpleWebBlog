import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { HttpService } from '../../../services/http.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { MatButtonModule } from '@angular/material/button';
import { title } from 'node:process';

@Component({
    selector: 'app-post-form',
    standalone: true,
    imports: [
        MatFormFieldModule,
        MatInputModule,
        CdkTextareaAutosize,
        MatButtonModule,
        ReactiveFormsModule,
    ],
    templateUrl: './post-form.component.html',
    styleUrl: './post-form.component.scss',
})
export class PostFormComponent {
    data: any = {};
    option = { responseType: 'text' };
    constructor(private _postMaker: HttpService) {}
    postForm = new FormGroup({
        user: new FormControl('Prueba'),
        title: new FormControl(''),
        description: new FormControl(''),
        text: new FormControl(''),
    });
    onSubmit() {
        this.data = this.postForm.value;
        this._postMaker
            .makePost(this.data, this.option)
            .subscribe((data: any) => {
                this.postForm.patchValue({
                    user: '',
                    title: '',
                    description: '',
                    text: '',
                });
                alert(data);
            });
    }
}
