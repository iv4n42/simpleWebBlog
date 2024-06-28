import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
    selector: 'app-user-page',
    standalone: true,
    imports: [MatTabsModule, MatCardModule],
    templateUrl: './user-profile.component.html',
    styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent {
    onSelectProfilePicture() {
    }
}
