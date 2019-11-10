import {Component, Input, OnInit} from '@angular/core';
import {UserConfig} from '../../../UserConfig';
import {FormControl, FormGroup} from '@angular/forms';
import {UserManagerService} from '../../../manager/user/user-manager.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  userLoginLink = UserConfig.userLoginLink;
  profileForm = new FormGroup({
    email: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl(''),
    confirm_password: new FormControl('')
  });
  constructor(private userManager: UserManagerService) { }

  ngOnInit() {
  }

  goToLogin() {
    window.open();
  }

  submitLogin() {
    console.log(this.profileForm.get('username'));
  }
}
