import { Component, OnInit } from '@angular/core';
import { BlogService } from '../core/services';
import { Blog } from '../core';
import { FormGroup, FormBuilder } from '@angular/forms';

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
    debugger
    Object.assign(this.blog, this.blogForm.value);
    this.blogService.save(this.blog)
      .subscribe((blog) => {
        this.blogForm = this.fb.group({
          title: '',
          content: '',
          status: 'UNPUBLISHED',
        });
      }, (error) => {
        this.blogForm = this.fb.group({
          title: '',
          content: '',
          status: 'UNPUBLISHED',
        });
      });
  }
}
