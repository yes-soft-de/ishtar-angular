import { Component, OnInit } from '@angular/core';
import {ArtTypeListItem} from '../../../entity/art-type-list/art-type-list-item';
import {ArtTypeService} from '../../../../admin/service/art-type/art-type.service';
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

  // for Requesting User Profile
  subscription: Subscription;
  constructor(private artTpeService: ArtTypeService, private httpClient: HttpClient) { }

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
    this.showTheHeader = true;
  }
  // display header on hover
  hideHeader() {
    this.showTheHeader = false;
  }

  updateUserStatus() {
    const source = interval(1000);
    const text = 'Your Text Here';
    this.subscription = source.subscribe(val => this.getUserProfile());
  }

  getUserProfile() {
    // This should be moved to UserService
    // and the Response Model to Entity :)
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
