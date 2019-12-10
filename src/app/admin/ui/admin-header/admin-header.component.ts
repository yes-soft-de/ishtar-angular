import { Component, OnInit } from '@angular/core';
import {UserProfileService} from '../../../user/service/client-profile/user-profile.service';
import {ArtTypeService} from '../../service/art-type/art-type.service';
import {MatDialog} from '@angular/material';
import {Router} from '@angular/router';
import {UserService} from '../../../user/shared/user/service/user.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss']
})
export class AdminHeaderComponent implements OnInit {

  constructor(private userService: UserService,
              private router: Router) { }

  ngOnInit() {
  }

  logout() {
    this.userService.logout();
    // window.location.reload();
    this.router.navigate(['/']);
  }

}
