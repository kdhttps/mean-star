import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { environment } from '../../../environments/environment';
import { ConstantsService } from './constants.service';

@Injectable()
export class UserService {

  constructor(
    private apiService: ApiService,
    private _constant: ConstantsService,
  ) { }

  get(): Observable<User[]> {
    return this.apiService.get(environment.apiURL + this._constant.userEndpoint);
  }

  login(): Observable<User> {
    return this.apiService.get(environment.apiURL + this._constant.userLoginEndpoint);
  }
}
