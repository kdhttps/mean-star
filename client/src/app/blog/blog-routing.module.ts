import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogComponent } from './blog.component';
import { BlogManageComponent } from './blog-manage.component';

const routes: Routes = [
  {
    path: 'blog',
    component: BlogComponent,
  },
  {
    path: 'blog/manage',
    component: BlogManageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule {
}
