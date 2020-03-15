import {Component, OnInit} from '@angular/core';
import {AuthService} from '../core/services';

@Component({
  selector: 'app-login-page',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService) {
    authService.redirect();
  }

  ngOnInit(): void {
  }
}
