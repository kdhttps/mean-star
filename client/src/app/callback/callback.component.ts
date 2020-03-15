import {Component, OnInit} from '@angular/core';
import {AuthService} from '../core/services';

@Component({
  selector: 'app-callback-page',
  templateUrl: './callback.component.html'
})
export class CallbackComponent implements OnInit {

  constructor(private authService: AuthService) {
    authService.handleCodeAndAuthorization();
  }


  ngOnInit(): void {
  }
}
