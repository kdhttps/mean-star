import { Injectable, } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { catchError } from 'rxjs/operators';
import { Blog, BlogService } from '../core';

@Injectable()
export class BlogResolver implements Resolve<Blog> {
  constructor(
    private blogService: BlogService,
    private router: Router,
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    debugger
    return this.blogService.getById(route.params.id)
      .pipe(catchError((err) => this.router.navigateByUrl('/')));
  }
}
