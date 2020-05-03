import { NgModule } from '@angular/core';
import { ApiService, AuthService, UserService, BlogService } from './services';
import { HttpTokenInterceptor } from './interceptors';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
    ApiService,
    UserService,
    AuthService,
    BlogService,
  ],
  declarations: []
})
export class CoreModule { }
