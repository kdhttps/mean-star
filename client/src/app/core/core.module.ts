import { NgModule } from '@angular/core';
import { ApiService, AuthService, UserService, BlogService, ConstantsService } from './services';
import { HttpTokenInterceptor } from './interceptors';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MessagesService } from './services/messages.service';

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
    ConstantsService,
    MessagesService,
  ],
  declarations: []
})
export class CoreModule { }
