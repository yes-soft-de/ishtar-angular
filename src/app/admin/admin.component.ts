import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {UserConfig} from '../user/UserConfig';
import {AdminConfig} from './AdminConfig';
import {ToastrService} from 'ngx-toastr';
import {UserProfileService} from '../user/service/client-profile/user-profile.service';
import {animate, group, query, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  // animations: [
  //   // as we know every animation is a trigger so we define functions call 'trigger'
  //   trigger(('router'), [
  //     // the animation is transition | StateChangeExpr: 'fromState => ToState'
  //     // 0: is the data in the route ex :   {image: '', component: HomeComponent, data: {index: 0}}, 1: data: {index: 1}
  //     transition('0 => 1, 1 => 2, 0 => 2, 3 => 4, 0 => 3, 0 => 4', [
  //       // group using if we want to execute the query(':enter') and query(':leave') in the same time
  //       group([
  //         // make select element using 'query'
  //         query(':enter', [       // select the element that appear or enter
  //           // select the property that we want to use
  //           style({
  //             transform: 'translateX(100%)'
  //           }),
  //           animate(500, style({
  //             transform: 'translateX(0)'
  //           }))
  //         ]),
  //         query(':leave', [         // select the element that disappear or leave
  //           // select the property that we want to use
  //           style({
  //             transform: 'translateX(0)'
  //           }),
  //           animate(500, style({
  //             transform: 'translateX(-100%)'
  //           }))
  //         ])
  //       ])
  //     ]),
  //     transition('2 => 1, 1 => 0, 2 => 0, 4 => 3, 4 => 0, 3 => 0', [
  //       group([
  //         query(':enter', [
  //           style({
  //             transform: 'translateX(-100%)'
  //           }),
  //           animate(500, style({
  //             transform: 'translateX(0)'
  //           }))
  //         ]),
  //         query(':leave', [
  //           style({
  //             transform: 'translateX(0)'
  //           }),
  //           animate(500, style({
  //             transform: 'translateX(100%)'
  //           }))
  //         ])
  //       ])
  //     ])
  //   ])
  // ]
})
export class AdminComponent implements OnInit {

  constructor(private router: Router,
              private userConnector: UserProfileService,
              private toaster: ToastrService) {
  }

  ngOnInit() {
    this.userConnector.requestUserDetails().subscribe(
      data => {
        if (data.Data.userName === undefined) {
          alert('Unauthorized Access, Please Login!');
          this.router.navigate(['/']);
        } else {
          this.toaster.success('Welcome ' + data.Data.userName);
        }
      }
    );
  }

}
