import {Component, OnInit} from '@angular/core';
import {animate, group, query, style, transition, trigger} from '@angular/animations';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {UserProfileService} from '../user/service/client-profile/user-profile.service';
import {UserProfileManagerService} from '../user/manager/user-profile/user-profile-manager.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  animations: [
    trigger(('router'), [
      transition('0 => 1, 1 => 2, 2 => 3, 3 => 4, 4 => 5, 5 => 6, ' +
        '0 => 2, 0 => 3, 0 => 4, 0 => 5, 0 => 6, ' +
        '1 => 2, 1 => 3, 1 => 4, 1 => 5, 1 => 6, ' +
        '2 => 3, 2 => 4, 2 => 5, 2 => 6, ' +
        '3 => 4, 3 => 5, 3 => 6, 4 => 5, 4 => 6, 5 => 6', [
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
      transition('6 => 5, 6 => 4, 6 => 3, 6 => 2, 6 => 1, 6 => 0, ' +
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

  constructor(private router: Router,
              private userConnector: UserProfileService,
              private toaster: ToastrService,
              private userManager: UserProfileManagerService) {
  }

  ngOnInit() {
    this.userManager.getManagerObservable().subscribe(
      user => {
        if (user.email !== undefined && user.email !== null) {
          this.toaster.success('Welcome ' + user.username);
        } else {
          alert('Unauthorized Access, Please Login!');
          this.router.navigate(['/']);
        }
      }, () => {
        alert('Unauthorized Access, Please Login!');
        this.router.navigate(['/']);
      }
    );
    this.userManager.getUserProfile();
  }

}
