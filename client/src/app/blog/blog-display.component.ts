import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Blog } from '../core';

@Component({
  selector: 'app-blog-display-page',
  templateUrl: './blog-display.component.html'
})
export class BlogDisplayComponent implements OnInit {
  blog: Blog = {} as Blog;

  constructor(
    private route: ActivatedRoute,
  ) {
    const historyBlog = history.state.data;
  }

  ngOnInit(): void {
    // Retreive the prefetched article
    this.route.data.subscribe(
      (data: { blog: Blog }) => {
        this.blog = data.blog;
      }
    );
  }
}
