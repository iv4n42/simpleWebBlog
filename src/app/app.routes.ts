import { Routes } from '@angular/router';
import { PostPageComponent } from './main-page/post-page/post-page.component';
import { PostFormComponent } from './main-page/post-form/post-form.component';
import { UserPageComponent } from './main-page/user-page/user-page.component';

export const routes: Routes = [{path : 'post-page', component : PostPageComponent},
                               {path : 'post-form', component : PostFormComponent},
                               {path : 'user-page', component : UserPageComponent},
];
