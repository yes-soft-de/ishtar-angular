import {Component, OnDestroy, OnInit} from '@angular/core';
import {Artist} from '../../entity/artist/artist';
import {Painting} from '../../entity/painting/painting';
import {ArtistService} from '../../service/artist/artist.service';
import {PhotosListService} from '../../service/PhotosList/photos-list.service';
import {AuctionService} from '../../service/auction/auction.service';
import {AuctionList} from '../../entity/auction/auction-list';
import {forkJoin, Subscription} from 'rxjs';
import {StatueService} from '../../service/statue/statue.service';
import {StatueInterface} from '../../entity/statue/statue.interface';
import {ArtistInterface} from '../../entity/artist/artist-interface';
import {PaintingInterface} from '../../entity/painting/painting-interface';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  artists: {0: ArtistInterface, path: string, artType: string}[];
  paintings: PaintingInterface[];
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
      console.log('dashboard', data);
    });
  }

  ngOnDestroy() {
    this.combinedObservable.unsubscribe();
  }

}
