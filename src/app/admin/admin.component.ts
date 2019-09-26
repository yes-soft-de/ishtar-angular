import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {UserConfig} from '../user/UserConfig';
import {AdminConfig} from './AdminConfig';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private router: Router, private httpClient: HttpClient, private toaster: ToastrService) {
  }

  ngOnInit() {
    this.httpClient.get<{
      Data: {
        fullname: string
      }
    }>(AdminConfig.userProfileAPI).subscribe(
      data => {
        if (data.Data.fullname === undefined) {
          alert('Unauthorized Access, Please Login!');
          this.router.navigate(['/']);
        } else {
          this.toaster.success('Welcome ' + data.Data.fullname);
        }
      }
    );
  }

}
