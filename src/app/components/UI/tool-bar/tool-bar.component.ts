import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-tool-bar',
    standalone: true,
    imports: [
        MatToolbarModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        RouterModule,
        CommonModule,
    ],
    templateUrl: './tool-bar.component.html',
    styleUrl: './tool-bar.component.scss',
})
export class ToolBarComponent {
    @Input() loggedIn!: boolean;

    @Output() openSideNavEvent: EventEmitter<void> = new EventEmitter();
    @Output() logoutEvent: EventEmitter<void> = new EventEmitter();

    onMenuIconBtnClick(): void {
        this.openSideNavEvent.emit();
    }

    onLogoutBtnClick() {
        this.logoutEvent.emit();
    }
}
