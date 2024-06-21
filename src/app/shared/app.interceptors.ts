import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { UnauthorizedInterceptor } from "./interceptors/unauth/unauth.interceptor";

export const provideAppInterceptors = () => {
    return [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: UnauthorizedInterceptor,
            multi: true
        }
    ];
};