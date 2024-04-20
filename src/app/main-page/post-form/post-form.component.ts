import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpService } from '../../services/http.service';
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
            MatButtonModule,
            FormsModule
  ],
  templateUrl: './post-form.component.html',
  styleUrl: './post-form.component.scss'
})
export class PostFormComponent {
  data : any= {}
  option = {responseType : 'text'}
  constructor(private _postMaker : HttpService){}
  onSubmit(form : NgForm){
     this.data = form.value
     this._postMaker.makePost(this.data,this.option).subscribe((data : any) => {
      console.log(data)
     })
     }
   
   

  }


