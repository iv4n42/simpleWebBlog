import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { withFetch, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideNativeDateAdapter } from '@angular/material/core';
import { JwtModule } from '@auth0/angular-jwt';
import { provideMaterialTagsDefaultOptions } from './shared/material.config';
import { provideAppInterceptors } from './shared/app.interceptors';

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        provideClientHydration(),
        provideAnimationsAsync('animations'),
        provideHttpClient(withFetch(), withInterceptorsFromDi()),
        provideNativeDateAdapter(),
        provideMaterialTagsDefaultOptions(),
        importProvidersFrom([
            JwtModule.forRoot({
                config: {
                    tokenGetter: () => localStorage.getItem('userJWT'),
                },
            }),
        ]),
        provideAppInterceptors()
    ],
};
