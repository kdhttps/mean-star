import { Component, OnInit } from '@angular/core';
import { BlogService, MessagesService } from '../core/services';
import { Blog } from '../core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ToastService } from '../shared';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog-maange-page',
  templateUrl: './blog-manage.component.html'
})
export class BlogManageComponent implements OnInit {
  blogForm: FormGroup;
  blog: Blog = {} as Blog;
  blogStatus = ['UNPUBLISHED', 'PUBLISHED'];

  constructor(
    private blogService: BlogService,
    private fb: FormBuilder,
    private toastService: ToastService,
    private router: Router,
    private message: MessagesService,
  ) {
    this.blogForm = this.fb.group({
      title: '',
      content: '',
      status: 'UNPUBLISHED',
    });
   }

  ngOnInit(): void {
  }


  submitForm() {
    Object.assign(this.blog, this.blogForm.value);
    this.blogService.save(this.blog)
      .subscribe((blog) => {
        this.blogForm = this.fb.group({
          title: '',
          content: '',
          status: 'UNPUBLISHED',
        });
        this.toastService.show(this.message.add(this.message.blog), { classname: 'bg-success text-light' });
        this.router.navigate(['/blog']);
      }, (error) => {
        this.blogForm = this.fb.group({
          title: '',
          content: '',
          status: 'UNPUBLISHED',
        });
      });
  }
}
