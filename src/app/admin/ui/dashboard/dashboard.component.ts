import {Component, OnDestroy, OnInit} from '@angular/core';
import {Artist} from '../../entity/artist/artist';
import {Painting} from '../../entity/painting/painting';
import {ArtistService} from '../../service/artist/artist.service';
import {PhotosListService} from '../../service/PhotosList/photos-list.service';
import {PaintingListResponse} from '../../entity/PaintingList/painting-list-response';
import {AuctionListResponse} from '../../entity/auction/auction-list-response';
import {AuctionService} from '../../service/auction/auction.service';
import {AuctionList} from '../../entity/auction/auction-list';
import {Subscription} from 'rxjs';
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
  statues: StatueInterface[];
  latestArtistNumber = 5;
  latestPaintingNumber = 5;
  latestStatueNumber = 5;
  latestAuctionNumber = 5;
  allArtistsObservable: Subscription;
  allPaintingsObservable: Subscription;
  allAuctionObservable: Subscription;
  allStatuesObservable: Subscription;

  constructor(private artist: ArtistService,
              private photosListService: PhotosListService,
              private auctionService: AuctionService,
              private statueService: StatueService) { }

  ngOnInit() {
    // Fetch All Artists Number
    this.allArtistsObservable = this.artist.getAllArtists().subscribe(
      (data) => {
        this.artists = data.Data;
      }, error => {
        console.log(error);
      });
    // Fetch All Paintings
    this.allPaintingsObservable = this.photosListService.getAllPainting().subscribe(
      (res: PaintingListResponse) => {
      this.paintings = res.Data;
    }, error => {
      console.log(error);
    });
    // Fetch All Auction
    this.allAuctionObservable = this.auctionService.getAllAuctions().subscribe(
        (data: AuctionListResponse) => {
          this.auctions = data.Data;
        }, error => {
          console.log(error);
        });
    // Fetch All Statues
    this.allStatuesObservable = this.statueService.getAllStatues().subscribe(
        (data: StatuesResponse) => {
          this.statues = data.Data;
        }, error => {
          console.log(error);
        }
    );
  }

  ngOnDestroy() {
    this.allArtistsObservable.unsubscribe();
    this.allPaintingsObservable.unsubscribe();
    this.allAuctionObservable.unsubscribe();
    this.allStatuesObservable.unsubscribe();
  }

}
