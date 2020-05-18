import { NgModule } from '@angular/core';
import { BlogRoutingModule } from './blog-routing.module';
import { BlogComponent } from './blog.component';
import { BlogManageComponent } from './blog-manage.component';
import { SharedModule } from '../shared';
import { BlogDisplayComponent } from './blog-display.component';
import { BlogResolver } from './blog-resolver.service';

@NgModule({
  imports: [
    BlogRoutingModule,
    SharedModule,
  ],
  declarations: [
    BlogComponent,
    BlogManageComponent,
    BlogDisplayComponent,
  ],
  providers: [
    BlogResolver,
  ],
})
export class BlogModule {
}
