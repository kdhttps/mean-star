import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Blog } from '../models/blog.model';
import { environment } from '../../../environments/environment';
import { ConstantsService } from './constants.service';

@Injectable()
export class BlogService {

  constructor(
    private apiService: ApiService,
    private _constant: ConstantsService,
  ) { }

  get(): Observable<Blog[]> {
    return this.apiService.get(environment.apiURL + this._constant.blogEndpoint);
  }

  getAllBlogsByUser(userId: String): Observable<Blog[]> {
    return this.apiService.get(`${environment.apiURL}${this._constant.blogEndpoint}/user/${userId}`);
  }

  getMyBlogs(): Observable<Blog[]> {
    return this.apiService.get(`${environment.apiURL}${this._constant.blogEndpoint}/user`);
  }

  getBlogs(): Observable<Blog[]> {
    return this.apiService.get(`${environment.apiURL}${this._constant.blogEndpoint}/ls`);
  }

  getById(id: String): Observable<Blog[]> {
    return this.apiService.get(`${environment.apiURL}${this._constant.blogEndpoint}/${id}`);
  }

  save(blog: Blog): Observable<Blog> {
    const id = blog._id;
    delete blog._id;
    if (id) {
      return this.apiService.put(`${environment.apiURL}${this._constant.blogEndpoint}/${id}`, blog);  
    }
    return this.apiService.post(environment.apiURL + this._constant.blogEndpoint, blog);
  }

  update(id: String, blog: Blog): Observable<Blog> {
    return this.apiService.put(`${environment.apiURL}${this._constant.blogEndpoint}/${id}`, blog);
  }
}
