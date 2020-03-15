import {NgModule} from '@angular/core';
import {CallbackRoutingModule} from './callback-routing.module';
import {CallbackComponent} from './callback.component';

@NgModule({
  imports: [
    CallbackRoutingModule
  ],
  declarations: [
    CallbackComponent
  ]
})
export class CallbackModule {
}
