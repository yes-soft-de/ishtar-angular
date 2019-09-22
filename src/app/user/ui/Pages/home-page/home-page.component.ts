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
  public paintingList: PaintingListItem[];
  showNavbar = false;
  artistList: ArtistListItem[];

  constructor(private artTpeService: ArtTypeService, private paintingService: PaintingListService,
              private artistService: ArtistListService, private httpClient: HttpClient) {
  }

  ngOnInit() {
    this.initPaintingList();
    this.artTpeService.getAllArtType().subscribe(
      data => {
        this.artTypeList = data.Data;
      }
    );

    this.getCurrentUserInfo();

    this.requestArtistList();

    this.paintingService.requestPaintingList().subscribe(
      data => {
        this.paintingList = [];
        for (const i of data.Data) {
          this.paintingList.push(i);
        }
      }
    );
  }

  initPaintingList() {
  }

  getCurrentUserInfo() {
    this.httpClient.get('http://k-symfony.96.lt/user').subscribe(
      data => {
        console.log(JSON.stringify(data));
      }, error => {
        console.log(error);
      }
    );
  }

  // region Direction Calculator
  @HostListener('window:scroll', [])
  doSomething() {
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

  requestArtistList() {
    this.artistService.requestArtistList().subscribe(
      data => {
        this.artistList = data.Data;
        // console.log(JSON.stringify(data.Data));
      }, error1 => {
        this.requestArtistList();
      });
  }
}
