import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuctionService} from '../../../service/auction/auction.service';
import {AuctionListResponse} from '../../../entity/auction/auction-list-response';
import {Router} from '@angular/router';
import {AuctionList} from '../../../entity/auction/auction-list';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-list-auctions',
  templateUrl: './list-auctions.component.html',
  styleUrls: ['./list-auctions.component.scss']
})
export class ListAuctionsComponent implements OnInit, OnDestroy {
  auctions: AuctionList[];
  auctionObservable: Subscription;
  constructor(private router: Router,
              private auctionService: AuctionService) { }

  ngOnInit() {
    this.auctionObservable = this.auctionService.getAllAuctions().subscribe(
        (data: AuctionListResponse) => {
          this.auctions = data.Data;
        },
        error1 => {
          console.log(error1);
        }
    );
  }

  ngOnDestroy() {
      this.auctionObservable.unsubscribe();
  }

}
