import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { UnauthorizedInterceptor } from "./interceptors/unauth/unauth.interceptor";
import { AddJwtBearerInterceptor } from "./interceptors/add-jwt-bearer/add-jwt-bearer.interceptor";

export const provideAppInterceptors = () => {
    return [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: UnauthorizedInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AddJwtBearerInterceptor,
            multi: true
        }
    ];
};