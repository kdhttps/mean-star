import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserModule } from './user/user.module';
import { HomeModule } from './home/home.module';
import { LoginModule } from './login/login.module';
import { CallbackModule } from './callback/callback.module';
import { CoreModule } from './core';
import { HeaderComponent, SharedModule } from './shared';
import { BlogModule } from './blog/blog.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
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
