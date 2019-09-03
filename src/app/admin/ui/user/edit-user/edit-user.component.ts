import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {UserService} from '../../../service/user/user.service';
import {UserInterface} from '../../../entity/user/user-interface';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  userID: string;
  userData = {
    id: '',
    name: '',
    userName: '',
    password: '',
    email: ''
  };

  constructor(private router: Router,
              private route: ActivatedRoute,
              private user: UserService ) { }

  ngOnInit() {
    // Fetch The User ID
    this.route.paramMap.subscribe((param: ParamMap) => {
      this.userID = param.get('id');
    });
    // Fetch The User Data Depends On His ID
    this.user.getUserByUser(this.userID).subscribe(
        data => {
          if (data) {
            this.userData.id = `${data.id}`;
            this.userData.name = data.name;
            this.userData.userName = data.userName;
            this.userData.password = data.password;
            this.userData.email = data.email;
            console.log(this.userData);
          }
        },
        error => {
          console.log(error);
        }
    );
  }

  // Save THe Data After Update It
  myEditSubmit(form) {
      this.user.updateUser(this.userID, form.value).subscribe(
          (data: UserInterface) => {
            console.log('request successfully', data);
          },
          error => {
            console.log(error);
          },
          () => {
            this.router.navigate(['admin/list-user']);
          }
      );
  }
}
