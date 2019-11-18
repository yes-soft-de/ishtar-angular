import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {ArtistDetails} from '../../../entity/artist/artist-details';
import {PaintingListItem} from '../../../entity/painting-list/painting-list-item';
import {PaintingService} from '../../../service/painting/painting.service';
import {PaintingListResponse} from '../../../entity/painting-list/painting-list-response';
import {ArtistService} from '../../../service/artist/artist.service';
import {forkJoin, Observable} from 'rxjs';

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
              private artistService: ArtistService,
              private activatedRoute: ActivatedRoute,
              private photoService: PaintingService) {
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((param: ParamMap) => {
      this.artistId = Number(param.get('id'));
      this.fetchData();
      // this.fetchNextArtist(); // Fetch The Next Artist To Check If The Id Is Correct Or NOt
      // this.fetchPrevArtist(); // Fetch The Prev Artist To Check If The Id Is Correct Or NOt
    });

  }

  private fetchData() {
    // get artist By id using observable
    const artistListObs: Observable<any> = this.artistService.requestArtistDetails(this.artistId);
    // Fetch All Painting For This Artist
    const paintingListByArtistObs: Observable<any> = this.photoService.requestPaintingListBy('artist', this.artistId);
    // Fetch The Next Artist To Check If The Id Is Correct Or NOt
    const nextArtistObs: Observable<any> = this.artistService.requestArtistDetails(this.artistId + 1);
    // Fetch The Prev Artist To Check If The Id Is Correct Or NOt
    const prevArtistObs: Observable<any> = this.artistService.requestArtistDetails(this.artistId - 1);
    // Combined All Observable
    const combinedObs = forkJoin(artistListObs, paintingListByArtistObs, nextArtistObs, prevArtistObs);
    combinedObs.subscribe((data: any) => {
      this.artist = data[0].Data[0];
      this.paintingList = data[1].Data;
      this.paintingSlidesPage = this.chunk(this.paintingList, 4);
      const random = `${Math.random() * 100}`;
      const randPainting = parseInt(random, 10) % this.paintingList.length;
      this.artistMainPaintingPage = this.paintingList[randPainting];
      this.nextArtistExistsPage = !data[2].Data[0] ? false : true;
      this.prevArtistExistsPage = !data[3].Data[0] ? false : true;
      console.log('Current artist:', this.artist);
      console.log('Painting List: ', this.paintingList);
      console.log('Next artist: ', this.nextArtistExistsPage);
      console.log('Prev artist: ', this.prevArtistExistsPage);
    });
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
