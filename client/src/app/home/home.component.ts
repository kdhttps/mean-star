import { Component, OnInit } from '@angular/core';
import { AuthService, BlogService } from '../core/services';
import { Blog } from '../core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  isAuthenticated: boolean;
  blogs: Blog[] = null;

  constructor(
    private authService: AuthService,
    private blogService: BlogService,
  ) { }

  ngOnInit(): void {
    this.blogService.getMyBlogs().subscribe(
      (blogs) => this.blogs = blogs,
      (error) => console.log(error)
    )
  }
}
