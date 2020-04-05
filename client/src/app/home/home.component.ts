import {Component, OnInit} from '@angular/core';
import {AuthService} from '../core/services';

@Component({
  selector: 'app-home-page',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  isAuthenticated: boolean;

  constructor(
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.populate();
  }
}
