import {NgModule} from '@angular/core';
import {ApiService, AuthService, UserService} from './services';
import {HttpTokenInterceptor} from './interceptors';
import {HTTP_INTERCEPTORS} from '@angular/common/http';

@NgModule({
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
    ApiService,
    UserService,
    AuthService
  ],
  declarations: []
})
export class CoreModule {}
