import {NgModule} from '@angular/core';
import {ApiService, AuthService, UserService} from './services';

@NgModule({
  providers: [
    ApiService,
    UserService,
    AuthService
  ],
  declarations: []
})
export class CoreModule {}
