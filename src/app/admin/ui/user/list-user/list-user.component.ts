import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../../entity/user/user';
import {UserService} from '../../../service/user/user.service';
import {UserListResponse} from '../../../entity/UserList/user-list-response';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {
  users: User[];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private userService: UserService ) { }

  ngOnInit() {
    // Fetch All Users
    this.userService.getAllUsers().subscribe(
        (data: UserListResponse) => {
            if (data) {
                this.users = data.Data;
            }
      }, error => {
        // TODO think if there is some to do here ex : display message if there is error
        console.log('Error :', error);
      });

  }

  // Delete The User
  delete(userId) {
    this.userService.deleteUser(userId).subscribe(
      data => {
        console.log('the delete request was successfully done', data);
        this.router.navigate(['/admin/list-users']);
      },
      error => {
        console.log('Sorry There Is Error : ', error);
      },
        () => {
        console.log('done');
        this.router.navigate(['../'], {relativeTo: this.route});
        }
    );
  }

}
