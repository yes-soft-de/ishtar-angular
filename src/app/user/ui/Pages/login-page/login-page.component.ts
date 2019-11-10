import {Component, Input, OnInit} from '@angular/core';
import {UserConfig} from '../../../UserConfig';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserManagerService} from '../../../manager/user/user-manager.service';
import {UserKeys} from "../../../entity/auth/user-keys";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  userLoginLink = UserConfig.userLoginLink;
  loginForm: FormGroup;
  registerForm: FormGroup;

  userKeys: UserKeys;

  constructor(private userManager: UserManagerService,
              private fb: FormBuilder, private toaster: ToastrService) {
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });

    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirm_password: ['', [Validators.required]]
    });

    this.userManager.subscribeToRepo().subscribe(
      data => {
        if (data !== null) {
          this.userKeys = data;
          window.location.reload();
        }
      }
    );
  }

  goToLogin() {
    window.open();
  }

  submitLogin() {
    this.userManager.login(this.loginForm.get('username').value, this.loginForm.get('password').value);
  }

  submitRegister() {
    if (this.registerForm.get('password').value === this.registerForm.get('confirm_password').value) {
      this.userManager.login(this.registerForm.get('username').value, this.registerForm.get('password').value);
    } else {
      this.toaster.error('Password Mismatch!');
      console.log(this.registerForm.get('password').value + ' != ' + this.registerForm.get('confirm_password').value);
    }
  }
}
