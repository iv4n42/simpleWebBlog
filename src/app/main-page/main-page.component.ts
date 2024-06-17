import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { PostPageComponent } from './post-page/post-page.component';
import { PostFormComponent } from '../containers/forms/post-form/post-form.component';
import { UserPageComponent } from './user-page/user-page.component';
import { ToolBarComponent } from '../components/UI/tool-bar/tool-bar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-main-page',
    standalone: true,
    imports: [
        PostPageComponent,
        PostFormComponent,
        UserPageComponent,
        ToolBarComponent,
        MatSidenavModule,
        MatListModule,
        MatButtonModule,
        MatIconModule,
        RouterOutlet,
        RouterModule,
        CommonModule,
    ],
    templateUrl: './main-page.component.html',
    styleUrl: './main-page.component.scss',
})
export class MainPageComponent {
    sidenavOpened: boolean = true;

    toggleSidenav() {
        throw new Error('Method not implemented.');
    }
}
