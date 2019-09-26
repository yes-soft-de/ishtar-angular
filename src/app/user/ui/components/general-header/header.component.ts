import { Component, OnInit } from '@angular/core';
import {ArtTypeListItem} from '../../../entity/art-type-list/art-type-list-item';
import {ArtTypeService} from '../../../../admin/service/art-type/art-type.service';
import {MatDialog} from '@angular/material';
import {LoginPageComponent} from '../../Pages/login-page/login-page.component';
import {interval, Subscription} from 'rxjs';
import {UserConfig} from '../../../UserConfig';
import {HttpClient} from '@angular/common/http';

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
  constructor(private artTpeService: ArtTypeService, public dialog: MatDialog, private httpClient: HttpClient) { }

  ngOnInit() {
    this.artTpeService.getAllArtType().subscribe(
      data => {
        this.artTypeList = data.Data;
      }
      );

    this.updateUserStatus();
  }

  // show header on hover
  showHeader() {
    this.showTheHeader = false;
  }
  // display header on hover
  hideHeader() {
    this.showTheHeader = false;
  }

  showDialog() {
    this.dialog.open(LoginPageComponent, {
      width: '100vw',
      hasBackdrop: true
    });
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
