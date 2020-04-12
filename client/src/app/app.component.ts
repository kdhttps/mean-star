import { Component } from '@angular/core';
import {AuthService} from './core/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: []
})
export class AppComponent {
  title = 'client';

  constructor(private authService: AuthService) {
    this.authService.populate();
  }
}
