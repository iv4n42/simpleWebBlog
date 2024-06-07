import { Component } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';


@Component({
  selector: 'app-tool-bar',
  standalone: true,
  imports: [MatToolbarModule,
            MatFormFieldModule,
            MatInputModule,
            MatIconModule,
  ],
  templateUrl: './tool-bar.component.html',
  styleUrl: './tool-bar.component.scss'
})
export class ToolBarComponent {

}
