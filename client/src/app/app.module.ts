import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { UserModule } from './user/user.module';
import { HomeModule } from './home/home.module';
import { LoginModule } from './login/login.module';
import { CallbackModule } from './callback/callback.module';
import { CoreModule } from './core';
import { SharedModule } from './shared';
import { BlogModule } from './blog/blog.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    UserModule,
    HomeModule,
    LoginModule,
    CallbackModule,
    CoreModule,
    SharedModule,
    BlogModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
