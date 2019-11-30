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

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
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
  artistList: ArtistListItem[];

  constructor(private userArtTypeService: UserArtTypeService, private paintingService: PaintingService,
              private artistService: ArtistService, private httpClient: HttpClient) {
  }

  ngOnInit() {
    this.requestArtTypeList();
    this.getCurrentUserInfo();
    this.requestArtistList();
    this.requestPaintingList();

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
          console.log('Painting List : ', this.paintingList);
          this.checkLoadingFinished();
        }, error1 => {
          console.log(error1);
        }
    );
  }

  getCurrentUserInfo() {
    this.httpClient.get(UserConfig.userProfileAPI).subscribe(
        data => {
          console.log('User INFO : ', data);
        }, error => {
          console.log(error);
        }
    );
  }

  requestArtistList() {
    this.artistService.requestArtistList().subscribe(
        (data: any) => {
          this.artistList = data.Data;
          this.checkLoadingFinished();
        }, error1 => {
          console.log(error1);
        });
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
