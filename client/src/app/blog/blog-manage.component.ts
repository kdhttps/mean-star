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
    const historyBlog = history.state.data;
    if(historyBlog && historyBlog._id) {
      const seoMeta = historyBlog.seoMeta;

      this.blogForm = this.fb.group({
        title: historyBlog.title,
        content: historyBlog.content,
        status: historyBlog.status,
        seoMeta: this.fb.group({
          image: seoMeta && seoMeta.image,
          url: seoMeta && seoMeta.url,
          description: seoMeta && seoMeta.description,
          title: seoMeta && seoMeta.title,
          keywords: seoMeta && seoMeta.keywords,
        })
      });
      this.blog._id = historyBlog._id;
    } else {
      this.blogForm = this.fb.group({
        title: '',
        content: '',
        status: 'UNPUBLISHED',
        seoMeta: this.fb.group({
          image: '',
          url: '',
          description: '',
          title: '',
          keywords: '',
        }),
      });
    }
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
          seoMeta: {
            image: '',
            url: '',
            description: '',
            title: '',
            keywords: '',
          },
        });
        this.toastService.show(this.message.add(this.message.blog), { classname: 'bg-success text-light' });
        this.router.navigate(['/blog']);
      }, (error) => {
        this.toastService.show(this.message.error(this.message.blog, error.message), { classname: 'bg-danger text-light' });
        this.blogForm = this.fb.group({
          title: '',
          content: '',
          status: 'UNPUBLISHED',
          seoMeta: {
            image: '',
            url: '',
            description: '',
            title: '',
            keywords: '',
          },
        });
      });
  }
}
