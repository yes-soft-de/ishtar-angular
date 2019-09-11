import { Component, OnInit } from '@angular/core';
import {Artist} from '../../entity/artist/artist';
import {Painting} from '../../entity/painting/painting';
import {ArtistService} from '../../service/artist/artist.service';
import {PhotosListService} from '../../service/PhotosList/photos-list.service';
import {PaintingListResponse} from '../../entity/PaintingList/painting-list-response';
<<<<<<< Updated upstream
=======
import {AuctionListResponse} from '../../entity/auction/auction-list-response';
import {AuctionService} from '../../service/auction/auction.service';
import {Auction} from '../../entity/auction/auction';
import {AuctionList} from '../../entity/auction/auction-list';
>>>>>>> Stashed changes


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  artists: Artist[];
  paintings: Painting[];
  constructor(private artist: ArtistService,
              private photosListService: PhotosListService) { }
  ngOnInit() {
    // Fetch All Artists Number
    this.artist.getAllArtists().subscribe(
      (data) => {
        this.artists = data.Data;
      }, error1 => {
        console.log(error1);
      });
    // Fetch All Paintings
    this.photosListService.getAllPainting().subscribe(
      (res: PaintingListResponse) => {
      this.paintings = res.Data;
    }, error1 => {
      console.log(error1);
    });
<<<<<<< Updated upstream
=======
    // Fetch All Auction
    this.auctionService.getAllAuctions().subscribe(
        (data: AuctionListResponse) => {
          this.auctions = data.Data;
          console.log(data);
        },
        error1 => {
          console.log(error1);
        }
    );
>>>>>>> Stashed changes
  }

}
