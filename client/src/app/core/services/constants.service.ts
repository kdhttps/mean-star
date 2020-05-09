import { Injectable } from '@angular/core';

@Injectable()
export class ConstantsService {
  // user
  readonly userEndpoint: string = '/users';
  readonly userLoginEndpoint: string = '/users/login';

  // Blog endpoint
  readonly blogEndpoint: string = '/blogs';
}
