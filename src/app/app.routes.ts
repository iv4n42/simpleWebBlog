import { Routes } from '@angular/router';
import { PostListingComponent } from './components/post-listing/post-listing.component';
import { PostFormComponent } from './containers/forms/post-form/post-form.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { SignupFormComponent } from './containers/forms/signup-form/signup-form.component';
import { EntryComponent } from './components/entry/entry.component';

export const routes: Routes = [
    { path: '', component: EntryComponent },
    { path: 'posts', component: PostListingComponent },
    { path: 'create-post', component: PostFormComponent },
    { path: 'user-profile', component: SignupFormComponent },
];
