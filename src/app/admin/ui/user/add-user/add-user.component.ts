import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../service/user/user.service';
import {User} from '../../../entity/user/user';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  constructor(private user: UserService) { }

  ngOnInit() {
  }

  mySubmit(form) {
    const user: User = new User();
    // TODO inserting new real data
    user.name = form.value.name;
    user.userName = form.value.userName;
    user.password = form.value.password;
    user.email = form.value.email;
    console.log(user);
    this.user.postAddUser(user);
    // TODO insert ngx-toastr Message
  }

}
