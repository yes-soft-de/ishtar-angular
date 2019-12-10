import {Component, OnInit} from '@angular/core';
import {animate, group, query, style, transition, trigger} from '@angular/animations';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {UserService} from '../user/shared/user/service/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  animations: [
    trigger(('router'), [
      transition('0 => 1, 1 => 2, 2 => 3, 3 => 4, 4 => 5, 5 => 6, 6 => 7,' +
          '0 => 2, 0 => 3, 0 => 4, 0 => 5, 0 => 6, 0 => 7,' +
          '1 => 2, 1 => 3, 1 => 4, 1 => 5, 1 => 6, 1 => 7,' +
          '2 => 3, 2 => 4, 2 => 5, 2 => 6, 2 => 7,' +
          '3 => 4, 3 => 5, 3 => 6, 3 => 7, 4 => 5, 4 => 6, 4 => 7, 5 => 6, 5 => 7, 6 => 7', [
        group([
          query(':enter', [
            style({
              transform: 'translateX(100%)'
            }),
            animate(500, style({
              transform: 'translateX(0)'
            }))
          ]),
          query(':leave', [
            style({
              transform: 'translateX(0)'
            }),
            animate(500, style({
              transform: 'translateX(-100%)'
            }))
          ])
        ])
      ]),
      transition('7 => 6, 7 => 5, 7 => 4, 7 => 3, 7 => 2, 7 => 1, 7 => 0,' +
          '6 => 5, 6 => 4, 6 => 3, 6 => 2, 6 => 1, 6 => 0, ' +
          '5 => 4, 5 => 3, 5 => 2, 5 => 1, 5 => 0, ' +
          '4 => 3, 4 => 2, 4 => 1, 4 => 0, ' +
          '3 => 2, 3 => 1, 3 => 0, 2 => 1, 2 => 0, 1 => 0', [
        group([
          query(':enter', [
            style({
              transform: 'translateX(-100%)'
            }),
            animate(500, style({
              transform: 'translateX(0)'
            }))
          ]),
          query(':leave', [
            style({
              transform: 'translateX(0)'
            }),
            animate(500, style({
              transform: 'translateX(100%)'
            }))
          ])
        ])
      ])
    ])
  ]
})
export class AdminComponent implements OnInit {

  constructor(private router: Router, private userService: UserService, private toaster: ToastrService) { }

  ngOnInit() {
    this.userService.getUserInfo().subscribe(
         userInfoResponse => {
         if (userInfoResponse.username === undefined) {
           alert('Unauthorized Access, Please Login!');
           this.router.navigate(['/']);
         } else {
          this.toaster.success('Welcome ' + userInfoResponse.username);
        }
      }
    );
  }

}
