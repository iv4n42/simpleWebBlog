import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { PostListingComponent } from '../../components/post-listing/post-listing.component';
import { PostFormComponent } from '../forms/post-form/post-form.component';
import { UserProfileComponent } from '../../components/user-profile/user-profile.component';
import { ToolBarComponent } from '../../components/UI/tool-bar/tool-bar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-main',
    standalone: true,
    imports: [
        PostListingComponent,
        PostFormComponent,
        UserProfileComponent,
        ToolBarComponent,
        MatSidenavModule,
        MatListModule,
        MatButtonModule,
        MatIconModule,
        RouterOutlet,
        RouterModule,
        CommonModule,
    ],
    templateUrl: './main.component.html',
    styleUrl: './main.component.scss',
})
export class MainPageComponent {
    sidenavOpened: boolean = false;
    loggedIn: boolean = false;
}
