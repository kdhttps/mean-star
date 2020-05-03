import {NgModule} from '@angular/core';
import {BlogRoutingModule} from './blog-routing.module';
import {BlogComponent} from './blog.component';
import { BlogManageComponent } from './blog-manage.component';
import { SharedModule } from '../shared';

@NgModule({
  imports: [
    BlogRoutingModule,
    SharedModule,
  ],
  declarations: [
    BlogComponent,
    BlogManageComponent,
  ]
})
export class BlogModule {
}
