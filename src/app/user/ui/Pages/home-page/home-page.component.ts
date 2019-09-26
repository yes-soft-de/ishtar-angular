import {Component, HostListener, OnInit} from '@angular/core';
import {ArtTypeService} from '../../../../admin/service/art-type/art-type.service';
import {ArtTypeListItem} from '../../../entity/art-type-list/art-type-list-item';
import {PaintingListService} from '../../../service/painting-list/painting-list.service';
import {PaintingListItem} from '../../../entity/painting-list/painting-list-item';
import {ArtistListItem} from '../../../entity/artist-list/artist-list-item';
import {ArtistListService} from '../../../service/artist-list/artist-list.service';
import {HttpClient} from '@angular/common/http';
import {interval, Subscription} from 'rxjs';
import {UserConfig} from '../../../UserConfig';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  position = 0;
  direction = 'down';
  artTypeList: ArtTypeListItem[];
  loadFinished = false;

  mostSeenArtType: ArtTypeListItem;

  public headerSlides = [{
    url: '../../../../../assets/hero-slide.jpg',
    title: 'Slide 01',
    text: 'Some Text Should Go In Here!'
  },
    {
      url: '../../../../../assets/hero-slide.jpg',
      title: 'Slide 02',
      text: 'Other Text Should Go In Here!'
    },
    {
      url: '../../../../../assets/hero-slide.jpg',
      title: 'Slide 03',
      text: 'Other than Other Text Should Go In Here!'
    }];
  paintingList: PaintingListItem[];
  showNavbar = false;
  artistList: ArtistListItem[];

  constructor(private artTpeService: ArtTypeService, private paintingService: PaintingListService,
              private artistService: ArtistListService, private httpClient: HttpClient) {
  }

  ngOnInit() {
    this.requestArtTypeList();
    this.getCurrentUserInfo();
    this.requestArtistList();
    this.requestPaintingList();
  }

  requestArtTypeList() {
    this.artTpeService.getAllArtType().subscribe(
      data => {
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
        this.checkLoadingFinished();
      }, error1 => {
        console.log(error1);
        // this.fetchData();
      }
    );
  }

  getCurrentUserInfo() {
    this.httpClient.get(UserConfig.userProfileAPI).subscribe(
      data => {
        console.log(JSON.stringify(data));
      }, error => {
        console.log(error);
      }
    );
  }

  requestArtistList() {
    this.artistService.requestArtistList().subscribe(
      data => {
        this.artistList = data.Data;
        this.checkLoadingFinished();
      }, error1 => {
        this.requestArtistList();
      });
  }

  // region Direction Calculator
  @HostListener('window:scroll', [])
  ShowHeader() {
    if (window.pageYOffset < 360) {
      this.showNavbar = false;
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
      console.log(this.direction);
      this.showNavbar = true;
    } else if (delta < 0 && oldDir !== 'Up') {
      this.direction = 'Up';
      console.log(this.direction + ' delta ' + delta);
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
