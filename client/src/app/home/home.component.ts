import { Component, OnInit } from '@angular/core';
import { AuthService, BlogService } from '../core/services';
import { Blog } from '../core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  isAuthenticated: boolean;
  blogs: Blog[] = null;

  constructor(
    private authService: AuthService,
    private blogService: BlogService,
  ) { }

  ngOnInit(): void {
    this.blogService.getBlogs().subscribe(
      (blogs) => this.blogs = blogs,
      (error) => console.log(error)
    )
  }
}
