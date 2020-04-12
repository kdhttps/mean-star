import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../core/services";
import {User} from "../../core/models";

@Component({
  selector: 'app-layout-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  constructor(
    private authService: AuthService
  ) {}

  currentUser: User;

  ngOnInit(): void {
    this.authService.currentUser.subscribe(
      (userData) => {
        this.currentUser = userData;
      }
    );
  }
}
