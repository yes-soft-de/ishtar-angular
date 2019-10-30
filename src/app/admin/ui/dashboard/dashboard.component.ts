import {Component, OnDestroy, OnInit} from '@angular/core';
import {Artist} from '../../entity/artist/artist';
import {Painting} from '../../entity/painting/painting';
import {ArtistService} from '../../service/artist/artist.service';
import {PhotosListService} from '../../service/PhotosList/photos-list.service';
import {PaintingListResponse} from '../../entity/PaintingList/painting-list-response';
import {AuctionListResponse} from '../../entity/auction/auction-list-response';
import {AuctionService} from '../../service/auction/auction.service';
import {AuctionList} from '../../entity/auction/auction-list';
import {forkJoin, Subscription} from 'rxjs';
import {StatuesResponse} from '../../entity/statue/statues.response';
import {StatueService} from '../../service/statue/statue.service';
import {StatueInterface} from '../../entity/statue/statue.interface';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  artists: Artist[];
  paintings: Painting[];
  auctions: AuctionList[];
  statues: {0: StatueInterface, price: string}[];
  latestArtistNumber = 5;
  latestPaintingNumber = 5;
  latestStatueNumber = 5;
  latestAuctionNumber = 5;
  combinedObservable: Subscription;

  constructor(private artist: ArtistService,
              private photosListService: PhotosListService,
              private auctionService: AuctionService,
              private statueService: StatueService) { }

  ngOnInit() {
    const allArtistObs    = this.artist.getAllArtists();              // fetch all artists
    const allPaintingObs  = this.photosListService.getAllPainting();  // fetch all paintings
    const allStatueObs    = this.statueService.getAllStatues();       // fetch all statues
    const combinedObs = forkJoin(allArtistObs, allPaintingObs, allStatueObs);  // combined all
    this.combinedObservable = combinedObs.subscribe((data: any) => {
      this.artists = data[0].Data;
      this.paintings = data[1].Data;
      this.statues = data[2].Data;
    });
  }

  ngOnDestroy() {
    this.combinedObservable.unsubscribe();
  }

}
