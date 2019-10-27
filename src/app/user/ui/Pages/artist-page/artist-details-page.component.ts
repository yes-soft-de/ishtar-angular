import {Component, OnInit} from '@angular/core';
import {UserArtistService} from '../../../service/user-artist-service/user-artist.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {ArtistDetails} from '../../../entity/artist/artist-details';
import {PaintingListItem} from '../../../entity/painting-list/painting-list-item';
import {PaintingListService} from '../../../service/painting-list/painting-list.service';

@Component({
  selector: 'app-artist-details-page',
  templateUrl: './artist-details-page.component.html',
  styleUrls: ['./artist-details-page.component.scss']
})
export class ArtistDetailsPageComponent implements OnInit {
  artist: ArtistDetails;
  paintingList: PaintingListItem[] = null;
  artistMainPaintingPage: PaintingListItem;
  paintingSlidesPage: any = [[]];             // For Storing Paintings and separate it to 4 pieces
  artistId: any;
  nextArtistExistsPage = false;
  prevArtistExistsPage = false;

  constructor(private router: Router,
              private artistService: UserArtistService,
              private activatedRoute: ActivatedRoute,
              private photoService: PaintingListService) {
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((param: ParamMap) => {
      this.artistId = Number(param.get('id'));
      this.fetchData();
      this.fetchNextAritst(); // Fetch The Next Artist To Check If The Id Is Correct Or NOt
      this.fetchPrevArtist(); // Fetch The Prev Artist To Check If The Id Is Correct Or NOt
    });

  }

  private fetchData() {
    // get artist id using observable
    this.artistService.requestArtistDetails(this.artistId).subscribe(
      data => {
        this.artist = data.Data[0];
        console.log('current artist :', this.artist);
      }, error1 => {
        console.log('Retrying', error1);
      }
    );

    this.photoService.requestPaintingListByArtist(this.artistId)
      .subscribe(
        data => {
          this.paintingList = data.Data;
          console.log(this.paintingList);
          this.paintingSlidesPage = this.chunk(this.paintingList, 4);
          const random = `${Math.random() * 100}`;
          const randPainting = parseInt(random, 10) % this.paintingList.length;
          this.artistMainPaintingPage = this.paintingList[randPainting];
        }, error1 => {
          console.log('Retrying', error1);
        }
      );
  }

  // Get The Next Artist Data
  fetchNextAritst() {
    // get artist id using observable
    this.artistService.requestArtistDetails(this.artistId + 1).subscribe(
        data => {
          this.nextArtistExistsPage = !data.Data[0] ? false : true;
          }, error1 => {
          console.log('Retrying', error1);
          // this.fetchData();
        }
    );
  }

  // Get The Previous Artist Data
  fetchPrevArtist() {
    // get artist id using observable
    this.artistService.requestArtistDetails(this.artistId - 1).subscribe(
        data => {
          this.prevArtistExistsPage = !data.Data[0] ? false : true;
        }, error1 => {
          console.log('Retrying', error1);
          // this.fetchData();
        }
    );
  }

  // create chunk of paintings array to use it in painting carousel
  chunk(paintingsArr, chunkSize) {
    const arr = [];
    for (let i = 0, len = paintingsArr.length; i < len; i += chunkSize) {
      arr.push(paintingsArr.slice(i, i + chunkSize));
    }
    return arr;
  }


}
