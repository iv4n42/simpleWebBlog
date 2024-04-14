import { Component } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import {MatButtonModule} from '@angular/material/button';


@Component({
  selector: 'app-post-form',
  standalone: true,
  imports: [MatFormFieldModule,
            MatInputModule,
            CdkTextareaAutosize,
            MatButtonModule
  ],
  templateUrl: './post-form.component.html',
  styleUrl: './post-form.component.scss'
})
export class PostFormComponent {

}
