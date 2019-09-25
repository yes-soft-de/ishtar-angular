import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ArtTypeDetails} from '../../../entity/art-type-details/art-type-details';
import {PaintingListItem} from '../../../entity/painting-list/painting-list-item';
import {CarouselComponent} from 'angular-bootstrap-md';
import {FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {UserConfig} from '../../../UserConfig';
import {HttpClient} from '@angular/common/http';
import {interval, Subscription} from 'rxjs';

@Component({
  selector: 'app-home-header',
  templateUrl: './home-header.component.html',
  styleUrls: ['./home-header.component.scss']
})
export class HomeHeaderComponent implements OnInit {
  @Input() public paintings: any[] = [];
  @Input() artTypeList: ArtTypeDetails[];
  activeSlide = 0;

  @ViewChild('heroSlider', {static: true}) public carousel: CarouselComponent;

  userLoginLink = UserConfig.userLoginLink;

  searchFrom = new FormGroup({
    search: new FormControl('')
  });

  userName = '';
  loadingUser = false;

  // for Requesting User Profile
  subscription: Subscription;

  constructor(private router: Router, private httpClient: HttpClient) {
  }

  ngOnInit() {
    this.updateUserStatus();
  }

  setActiveSlide(activeSlideNumber) {
    this.carousel.activeSlide = activeSlideNumber;
    this.activeSlide = activeSlideNumber;
  }

  slideChanged(event) {
    // console.log(event.relatedTarget);
    this.activeSlide = event.relatedTarget;
  }

  submitSearch() {
    this.router.navigate(['/search/' + this.searchFrom.get('search').value]);
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
