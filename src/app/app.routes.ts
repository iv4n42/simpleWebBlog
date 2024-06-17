import { Routes } from '@angular/router';
import { PostListingComponent } from './components/post-listing/post-listing.component';
import { PostFormComponent } from './containers/forms/post-form/post-form.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { SignupFormComponent } from './containers/forms/signup-form/signup-form.component';

export const routes: Routes = [{path : 'post-page', component : PostListingComponent},
                               {path : 'post-form', component : PostFormComponent},
                               {path : 'user-page', component : SignupFormComponent},
];
