import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../user/shared/user/service/user.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss']
})
export class AdminHeaderComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  logout() {
    this.userService.logout();
    window.location.href = '/';
  }

}
