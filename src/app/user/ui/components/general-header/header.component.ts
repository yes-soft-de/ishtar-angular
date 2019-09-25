import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {ArtTypeListItem} from '../../../entity/art-type-list/art-type-list-item';
import {ArtTypeService} from '../../../../admin/service/art-type/art-type.service';
import {interval, Subscription} from 'rxjs';
import {UserConfig} from '../../../UserConfig';
import {HttpClient} from '@angular/common/http';
import {LoginPageComponent} from '../../Pages/login-page/login-page.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  artTypeList: ArtTypeListItem[];
  showTheHeader = false;
  userName = '';
  loadingUser = false;

  // for Requesting User Profile
  subscription: Subscription;

  @ViewChild('LoginPopup', {static: false})
  loginPopup: LoginPageComponent;
  constructor(private artTpeService: ArtTypeService, private httpClient: HttpClient, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.artTpeService.getAllArtType().subscribe(
      data => {
        this.artTypeList = data.Data;
      }
    );
    this.updateUserStatus();
  }

  openDialog(): void {
    this.dialog.open(LoginPageComponent, {
      hasBackdrop: true,
      width: '100vw'
    });
  }

  // show header on hover
  showHeader() {
    this.showTheHeader = true;
  }

  // display header on hover
  hideHeader() {
    this.showTheHeader = false;
  }

  updateUserStatus() {
    const source = interval(1000);
    this.subscription = source.subscribe(val => {
      if (!this.loadingUser) {
        this.getUserProfile();
      }
    });
  }

  getUserProfile() {
    // This should be moved to UserService
    // and the Response Model to Entity :)
    this.loadingUser = true;
    this.httpClient.get<{
      Data: {
        fullname: string
      }
    }>(UserConfig.userProfileAPI).subscribe(
      data => {
        this.userName = data.Data.fullname;
      }
    );
  }
}
