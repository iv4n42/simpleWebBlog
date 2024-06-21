import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { withFetch } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { JwtModule } from '@auth0/angular-jwt';

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        provideClientHydration(),
        provideAnimationsAsync('animations'),
        provideHttpClient(withFetch()),
        provideNativeDateAdapter(),
        {
            provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
            useValue: { appearance: 'outline', hideRequiredMarker: true },
        },
        importProvidersFrom([
            JwtModule.forRoot({
                config: {
                    tokenGetter: () => localStorage.getItem('userJWT'),
                },
            }),
        ]),
    ],
};
