import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
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
import { AuthService } from '../../shared/services/auth/auth.service';

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
export class MainPageComponent implements OnInit {
    sidenavOpened!: boolean;
    loggedIn!: boolean;

    constructor(private _authService: AuthService, private _router: Router) {}

    ngOnInit() {
        const userToken = this._authService.getUserToken();
        this.loggedIn = !!userToken;
        this.sidenavOpened = !!userToken;

        this._authService.successfulSigninSubject.subscribe({
            next: () => {
                this.loggedIn = true;
                this.sidenavOpened = true;
                this._router.navigate(['/posts']);
            },
        });

        this._authService.logoutSubject.subscribe({
            next: () => {
                this.loggedIn = false;
                this.sidenavOpened = false;
                this._router.navigate(['']);
            },
        });
    }

    logoutUser(): void {
        this._authService.logout();
        this.loggedIn = false;
        this.sidenavOpened = false;
    }
}
