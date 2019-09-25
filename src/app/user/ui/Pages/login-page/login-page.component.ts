import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserConfig} from '../../../UserConfig';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  userLoginLink = UserConfig.userLoginLink;
  constructor() { }

  ngOnInit() {
  }

  goToLogin() {
    window.open();
  }
}
