import { Component, OnInit } from '@angular/core';
import { BlogService } from '../core/services';
import { Blog } from '../core';

@Component({
  selector: 'app-blog-page',
  templateUrl: './blog.component.html'
})
export class BlogComponent implements OnInit {
  blogs: Blog[] = null;
  hello = "hello";
  
  constructor(
    private blogService: BlogService
  ) { }

  ngOnInit(): void {
    this.blogService.getMyBlogs().subscribe(
      (blogs) => this.blogs = blogs,
      (error) => console.log(error) 
    )
  }
}
