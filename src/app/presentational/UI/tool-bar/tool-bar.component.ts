import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { SearchService } from '../../../shared/services/search/search.service';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

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
        MatAutocompleteModule,
        ReactiveFormsModule
    ],
    templateUrl: './tool-bar.component.html',
    styleUrl: './tool-bar.component.scss',
})
export class ToolBarComponent implements OnInit {
    @Input() loggedIn!: boolean;
    @Input() sidenavOpened!: boolean;

    @Output() toggleSidenavEvent: EventEmitter<void> = new EventEmitter();
    @Output() logoutEvent: EventEmitter<void> = new EventEmitter();
    searchForm! : FormGroup;
    searchOptions! : string[];
    constructor( public _searchService : SearchService){}

    ngOnInit(): void {
    this.searchForm = new FormGroup({
        search : new FormControl("")
    });
    this._searchService.allOptions$.subscribe(options => {
        this.searchOptions = options
    });
        
    }

    onMenuIconBtnClick(): void {
        this.toggleSidenavEvent.emit();
    }

    onLogoutBtnClick() {
        this.logoutEvent.emit();
    }

    submitSearch(){
        this._searchService.finalOption$.next(this.searchForm.get("search")?.value);
    }

    filterOptions() {
        let newOptions = this.searchOptions.filter( item => item.includes(this.searchForm.get("search")?.value));
        this._searchService.searchOptions$.next(newOptions);
       
    }
}
