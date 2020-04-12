import {Component, OnInit} from '@angular/core';
import {AuthService} from '../core/services';
import {User} from '../core/models';

@Component({
  selector: 'app-user-page',
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit {
  public user: User;

  constructor(private authservice: AuthService) {
    this.authservice.currentUser.subscribe(
      (user) => this.user = user,
      (err) => console.log(err)
    );
  }

  ngOnInit(): void {
  }
}
