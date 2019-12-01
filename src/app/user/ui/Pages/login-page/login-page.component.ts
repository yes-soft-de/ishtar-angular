import {Component, OnInit} from '@angular/core';
import {UserConfig} from '../../../UserConfig';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserManagerService} from '../../../manager/user/user-manager.service';
import {ToastrService} from 'ngx-toastr';
import {UserService} from '../../../shared/user/service/user.service';
import {Router} from '@angular/router';

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

  private registering = false;

  constructor(private userService: UserService,
              private router: Router,
              private fb: FormBuilder,
              private toaster: ToastrService) {

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
    this.userService.login(this.loginForm.get('username').value, this.loginForm.get('password').value);
  }

  // (c) This Fires After (b) is Successful
  private submitLoginAfterRegister(username: string, password: string) {
    this.userService.login(username, password).subscribe(
      () => {
        this.router.navigate(['/']);
      }, error1 => {
        this.toaster.error('Error' + error1);
      }
    );
  }

  submitRegister() {
    // We Save The Credentials to login later
    // (a) This Fires First
    if (this.registerForm.get('password').value === this.registerForm.get('confirm_password').value) {
      // Save This For Future Login Process
      this.email = this.registerForm.get('email').value;
      this.username = this.registerForm.get('username').value;
      this.password = this.registerForm.get('password').value;
      this.registering = true;
      this.userService.register(
        this.registerForm.get('email').value,
        this.registerForm.get('username').value,
        this.registerForm.get('password').value
      ).subscribe(
        () => {
          this.submitLoginAfterRegister(this.registerForm.get('email').value, this.registerForm.get('password').value);
        }, () => {
          this.toaster.error('Error in Registering user!');
        }
      );
    } else {
      this.toaster.error('Password Mismatch!');
      console.log(this.registerForm.get('password').value + ' != ' + this.registerForm.get('confirm_password').value);
    }
  }
}
