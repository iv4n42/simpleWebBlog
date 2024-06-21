import { Routes } from '@angular/router';
import { authGuard } from './shared/guards/auth/auth.guard';
import { accountGuard } from './shared/guards/account/account.guard';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        loadComponent: () =>
            import('./components/entry/entry.component').then(
                (x) => x.EntryComponent
            ),
        canActivate: [accountGuard],
    },
    {
        path: 'signup',
        loadComponent: () =>
            import('./containers/forms/signup-form/signup-form.component').then(
                (x) => x.SignupFormComponent
            ),
        canActivate: [accountGuard],
    },
    {
        path: 'signin',
        loadComponent: () =>
            import('./containers/forms/signin-form/signin-form.component').then(
                (x) => x.SigninFormComponent
            ),
        canActivate: [accountGuard],
    },
    {
        path: 'posts',
        loadComponent: () =>
            import('./components/post-listing/post-listing.component').then(
                (x) => x.PostListingComponent
            ),
        canActivate: [authGuard],
    },
    {
        path: 'create-post',
        loadComponent: () =>
            import('./containers/forms/post-form/post-form.component').then(
                (x) => x.PostFormComponent
            ),
        canActivate: [authGuard],
    },
    {
        path: 'user-profile',
        loadComponent: () =>
            import('./components/user-profile/user-profile.component').then(
                (x) => x.UserProfileComponent
            ),
        canActivate: [authGuard],
    },
];