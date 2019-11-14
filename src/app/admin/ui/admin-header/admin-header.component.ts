import { Component, OnInit } from '@angular/core';
import {UserProfileService} from '../../../user/service/client-profile/user-profile.service';
import {ArtTypeService} from '../../service/art-type/art-type.service';
import {MatDialog} from '@angular/material';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss']
})
export class AdminHeaderComponent implements OnInit {

  constructor(private userService: UserProfileService,
              private router: Router) { }

  ngOnInit() {
  }

  logout() {
    this.userService.requestUserLogout().subscribe(
      () => {
        console.log('Logout Successfully');
        this.router.navigate(['/']);
      });
  }

}
