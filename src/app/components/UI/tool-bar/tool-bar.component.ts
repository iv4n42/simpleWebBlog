import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { OutgoingMessage } from 'http';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-tool-bar',
    standalone: true,
    imports: [
        MatToolbarModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        CommonModule
    ],
    templateUrl: './tool-bar.component.html',
    styleUrl: './tool-bar.component.scss',
})
export class ToolBarComponent {
    @Input() loggedIn!: boolean;
    @Output() openSideNavEvent: EventEmitter<void> = new EventEmitter();

    emitOpenSideNav() {
        this.openSideNavEvent.emit();
    }
}
