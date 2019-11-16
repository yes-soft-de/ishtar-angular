import {Component, OnInit} from '@angular/core';
import {UserConfig} from '../../../UserConfig';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserManagerService} from '../../../manager/user/user-manager.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  userLoginLink = UserConfig.userLoginLink;
  loginForm: FormGroup;
  registerForm: FormGroup;

  private email: string;
  private password: string;
  private username: string;

  constructor(private userManager: UserManagerService,
              private fb: FormBuilder, private toaster: ToastrService) {
    // This Observable Should Fire Checking For Login
    // (2) This Fires After (1), If Successful
    this.userManager.getLoginObservable().subscribe(
      response => {
        // TODO: Do Something When Login Success
        window.location.reload();
      }, error1 => {
        // TODO: Do Something When Login Error Happen
        console.log(error1);
      }
    );

    // This Should Fire When using Register
    // (b) This Fires After (a)
    this.userManager.getRegisterObservable().subscribe(
      () => {
        // This Fires When Register Success, So Try to Login When That Happen!
        this.submitLoginAfterRegister(this.email, this.password);
      }, error1 => {
        // This Fires When Register Error Happens
        // TODO: Implement Register Failed Handler
        console.log(error1);
      }
    );
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });

    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirm_password: ['', [Validators.required]]
    });
  }

  goToLogin() {
    window.open();
  }

  submitLogin() {
    // (1) This Starts Login Process
    this.userManager.login(this.loginForm.get('username').value, this.loginForm.get('password').value);
  }

  // (c) This Fires After (b) is Successful
  private submitLoginAfterRegister(username: string, password: string) {
    this.userManager.login(username, password);
  }

  submitRegister() {
    // We Save The Credentials to login later
    // (a) This Fires First
    if (this.registerForm.get('password').value === this.registerForm.get('confirm_password').value) {
      // Save This For Future Login Process
      this.email = this.registerForm.get('email').value;
      this.username = this.registerForm.get('username').value;
      this.password = this.registerForm.get('password').value;
      this.userManager.register(
        this.registerForm.get('email').value,
        this.registerForm.get('username').value,
        this.registerForm.get('password').value
      );
    } else {
      this.toaster.error('Password Mismatch!');
      console.log(this.registerForm.get('password').value + ' != ' + this.registerForm.get('confirm_password').value);
    }
  }
}
