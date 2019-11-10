import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {ArtTypeListItem} from '../../../entity/art-type-list/art-type-list-item';
import {PaintingService} from '../../../service/painting/painting.service';
import {PaintingListItem} from '../../../entity/painting-list/painting-list-item';
import {ArtistListItem} from '../../../entity/artist-list/artist-list-item';
import {ArtistService} from '../../../service/artist/artist.service';
import {HttpClient} from '@angular/common/http';
import {UserConfig} from '../../../UserConfig';
import {ArtTypeListResponse} from '../../../entity/art-type-list/art-type-list-response';
import {UserArtTypeService} from '../../../service/art-type/user-art-type.service';
import {LoginService} from '../../../service/user-facade/login/login.service';
import {RegisterService} from '../../../service/user-facade/register/register.service';
import {UserKeys} from '../../../entity/auth/user-keys';
import {UserProfileService} from '../../../service/client-profile/user-profile.service';
import {UserProfileAuthService} from '../../../service/user-profile/user-profile-auth.service';
import {UserRepoService} from '../../../service/user-facade/user-repo.service';
import {isString} from 'util';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  private userKeys: UserKeys;
  position = 0;
  direction = 'down';
  artTypeList: ArtTypeListItem[];
  loadFinished = false;
  viewNumbers: { id: number, viewNumber: number }[];  // All Painting Seen Number
  mostSeenArtType: ArtTypeListItem;

  public headerSlides = [{
    url: '../../../../../assets/hero-slide.jpg',
    title: 'The beauty in its best form',
    text: ' '
  },
    {
      url: '../../../../../assets/hero-slide.jpg',
      title: 'From the best Syrian Artists',
      text: ' '
    },
    {
      url: '../../../../../assets/hero-slide.jpg',
      title: 'We present to you some masterpieces of art',
      text: ' '
    }];
  paintingList: PaintingListItem[];
  showNavbar = true;
  artistList: ArtistListItem[];

  constructor(private userArtTypeService: UserArtTypeService, private paintingService: PaintingService,
              private artistService: ArtistService, private httpClient: HttpClient, private userRepo: UserRepoService,
              private userProfileService: UserProfileAuthService) {
  }

  ngOnInit() {
    this.requestArtTypeList();
    this.getCurrentUserInfo();
    this.requestArtistList();
    this.requestPaintingList();

    // region Login/Logout Process
    // This Returns either the Keys of a String Explaining the Function Error
    this.userRepo.subscribeToRepo().subscribe(
      keys => {
        if (keys !== null) {
          this.userKeys = keys;
          console.log(`Login Success: User Id: ${keys.user_id}`);
        } else {
          console.log('Error In Login Repo!');
        }
      }
    );

    this.requestRegister('Mohammad15@Gmail.com', 'M0h@mm@d');
    // endregion
  }

  // region Requesting the Events
  requestLogin(username, password) {
    // If this completed correctly, the subscription above shall update the userKeys
    this.userRepo.login(username, password);
  }

  requestRegister(username, password) {
    this.userRepo.register(username, password);
  }
  // endregion

  // Fetch Most Seen Painting From Child Component
  getMostSeenPainting(event: { id: number, viewNumber: number }[]) {
    this.viewNumbers = event;
  }

  // Fetch Art Type
  requestArtTypeList() {
    this.userArtTypeService.getAllArtType().subscribe(
      (data: ArtTypeListResponse) => {
        this.artTypeList = data.Data;
        this.mostSeenArtType = data.Data[parseInt(`${(Math.random() * 100000)}`, 10) % data.Data.length];
        this.checkLoadingFinished();
      }
    );
  }

  requestPaintingList() {
    this.paintingService.requestPaintingList().subscribe(
      data => {
        this.paintingList = data.Data;
        // console.log('Painting List : ', this.paintingList);
        this.checkLoadingFinished();
      }, error1 => {
        // console.log(error1);
      }
    );
  }

  getCurrentUserInfo() {
    this.httpClient.get(UserConfig.userProfileAPI).subscribe(
      data => {
        // console.log('User INFO : ', data);
      }, error => {
        // console.log(error);
      }
    );
  }

  requestArtistList() {
    this.artistService.requestArtistList().subscribe(
      (data: any) => {
        this.artistList = data.Data;
        this.checkLoadingFinished();
      }, error1 => {
        // console.log(error1);
      });
  }

  // region Direction Calculator
  @HostListener('window:scroll', [])
  ShowHeader() {
    if (window.pageYOffset < 360) {
      this.showNavbar = true;
      return;
    }
    // Get the Past Location and direction
    const past = this.position;
    const oldDir = this.direction;
    // Get the new Location
    const current = window.pageYOffset;
    // Calc the difference
    const delta = current - past;
    if (Math.abs(delta) < 20) {
      // discard
      this.position = window.pageYOffset;
      return;
    }
    // So there is a movement
    if (delta > 0 && oldDir !== 'Down') {
      this.direction = 'Down';
      this.showNavbar = true;
    } else if (delta < 0 && oldDir !== 'Up') {
      this.direction = 'Up';
      this.showNavbar = true;
    }
    // Save Data For Future Calculations
    this.position = window.pageYOffset;
  }

  // endregion

  checkLoadingFinished() {
    if (this.paintingList == null) {
      return;
    }
    if (this.headerSlides == null) {
      return;
    }
    if (this.artistList == null) {
      return;
    }
    if (this.artTypeList == null) {
      return;
    }
    this.loadFinished = true;
  }
}
