import { Routes } from '@angular/router';
import { PostPageComponent } from './main-page/post-page/post-page.component';
import { PostFormComponent } from './containers/forms/post-form/post-form.component';
import { UserPageComponent } from './main-page/user-page/user-page.component';
import { SignupFormComponent } from './containers/forms/signup-form/signup-form.component';

export const routes: Routes = [{path : 'post-page', component : PostPageComponent},
                               {path : 'post-form', component : PostFormComponent},
                               {path : 'user-page', component : SignupFormComponent},
];
