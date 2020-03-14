import {NgModule} from '@angular/core';
import {UserRoutingModule} from './user-routing.module';
import {UserComponent} from './user.component';

@NgModule({
  imports: [
    UserRoutingModule
  ],
  declarations: [
    UserComponent
  ]
})
export class UserModule {
}
