import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Observable} from 'rxjs';
import {User} from '../models/user.model';
import {environment} from '../../../environments/environment';

@Injectable()
export class UserService {
  constructor(private apiService: ApiService) {}
  get(): Observable<User[]> {
    return this.apiService.get(environment.apiURL + environment.userEndpoint);
  }

  login(): Observable<User> {
    return this.apiService.get(environment.apiURL + environment.userLoginEndpoint);
  }
}
