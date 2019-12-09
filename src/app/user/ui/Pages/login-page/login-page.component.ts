import {Component, OnInit} from '@angular/core';
import {UserConfig} from '../../../UserConfig';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {UserService} from '../../../shared/user/service/user.service';
import {Router} from '@angular/router';
import {UserProfileService} from '../../../service/client-profile/user-profile.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  userLoginLink = UserConfig.userLoginLink;
  loginForm: FormGroup;
  registerForm: FormGroup;
  loginButtonActive = false;
  registerButtonActive = false;

  private email: string;
  private password: string;
  private username: string;

  private registering = false;

  constructor(private userService: UserService,
              private userProfileService: UserProfileService,
              private router: Router,
              private fb: FormBuilder,
              private toaster: ToastrService) {  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });

    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirm_password: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  goToLogin() {
    window.open();
  }

  googleLogin() {
    console.log('Is date Store In Cookie: ', localStorage.getItem('date'));
    if (!localStorage.getItem('date')) {
      console.log('cookie Is set', localStorage.getItem('date'));
      localStorage.setItem('date', new Date().toString());
    }
    return true;
  }

  submitLogin() {
    this.loginButtonActive = true;
    // (1) This Starts Login Process
    this.userService.login(this.loginForm.get('email').value, this.loginForm.get('password').value).subscribe(
      () => {
        this.loginButtonActive = false;
        window.location.reload();
      }, error1 => {
        this.loginButtonActive = false;
        this.toaster.error(error1);
      }
    );
  }

  // (c) This Fires After (b) is Successful
  private submitLoginAfterRegister(username: string, password: string) {
    this.userService.login(username, password).subscribe(
      () => {
        this.registerButtonActive = false;
        window.location.reload();
      }, error1 => {
        this.registerButtonActive = false;
        this.toaster.error('Error' + error1);
      }
    );
  }

  submitRegister() {
    // We Save The Credentials to login later
    // (a) This Fires First
    if (this.registerForm.get('password').value === this.registerForm.get('confirm_password').value) {
      this.registerButtonActive = true;
      // Save This For Future Login Process
      this.username = this.registerForm.get('username').value;
      this.password = this.registerForm.get('password').value;
      this.email = this.registerForm.get('email').value;
      this.registering = true;
      this.userService.register(
        this.registerForm.get('username').value,
        this.registerForm.get('email').value,
        this.registerForm.get('password').value
      ).subscribe(
        (submitRegister) => {
          this.submitLoginAfterRegister(this.registerForm.get('email').value, this.registerForm.get('password').value);
        }, () => {
          this.registerButtonActive = false;
          this.toaster.error('Error in Registering user!');
        }
      );
    } else {
      this.registerButtonActive = false;
      this.toaster.error('Password Mismatch!');
      // console.log(this.registerForm.get('password').value + ' != ' + this.registerForm.get('confirm_password').value);
    }
  }
}
