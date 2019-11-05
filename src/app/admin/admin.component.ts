import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {UserConfig} from '../user/UserConfig';
import {AdminConfig} from './AdminConfig';
import {ToastrService} from 'ngx-toastr';
import {UserProfileService} from '../user/service/client-profile/user-profile.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {

  constructor(private router: Router, private userConnector: UserProfileService, private toaster: ToastrService) { }

  ngOnInit() {
    // this.userConnector.requestUserDetails().subscribe(
    //   data => {
    //     if (data.Data.userName === undefined) {
    //       alert('Unauthorized Access, Please Login!');
    //       this.router.navigate(['/']);
    //     } else {
    //       this.toaster.success('Welcome ' + data.Data.userName);
    //     }
    //   }
    // );
  }

}
