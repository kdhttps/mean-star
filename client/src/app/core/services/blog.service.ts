import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Observable} from 'rxjs';
import {Blog} from '../models/blog.model';
import {environment} from '../../../environments/environment';

@Injectable()
export class BlogService {
  constructor(private apiService: ApiService) {}
  get(): Observable<Blog[]> {
    return this.apiService.get(environment.apiURL + environment.blogEndpoint);
  }

  getAllBlogsByUser(userId: String): Observable<Blog[]> {
    return this.apiService.get(`${environment.apiURL}${environment.blogEndpoint}/user/${userId}`);
  }

  getMyBlogs(): Observable<Blog[]> {
    return this.apiService.get(`${environment.apiURL}${environment.blogEndpoint}/user`);
  }

  getById(id: String): Observable<Blog[]> {
    return this.apiService.get(`${environment.apiURL}${environment.blogEndpoint}/${id}`);
  }

  save(blog: Blog): Observable<Blog> {
    return this.apiService.post(environment.apiURL + environment.blogEndpoint, blog);
  }

  update(id: String, blog: Blog): Observable<Blog> {
    return this.apiService.put(`${environment.apiURL}${environment.blogEndpoint}/${id}`, blog);
  }
}
