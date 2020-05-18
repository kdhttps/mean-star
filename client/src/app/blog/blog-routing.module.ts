import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogComponent } from './blog.component';
import { BlogManageComponent } from './blog-manage.component';
import { BlogDisplayComponent } from './blog-display.component';
import { BlogResolver } from './blog-resolver.service';

const routes: Routes = [
  {
    path: 'blog',
    component: BlogComponent,
  },
  {
    path: 'blog/manage',
    component: BlogManageComponent,
  },
  {
    path: 'blog/view/:id',
    component: BlogDisplayComponent,
    resolve: {
      blog: BlogResolver,
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule {
}
