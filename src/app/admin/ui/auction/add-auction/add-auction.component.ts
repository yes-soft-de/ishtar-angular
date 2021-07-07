import { Component, OnInit } from '@angular/core';
import {PaintingListResponse} from '../../../entity/PaintingList/painting-list-response';
import {PhotosListService} from '../../../service/PhotosList/photos-list.service';
import {Painting} from '../../../entity/painting/painting';
import {Auction} from '../../../entity/auction/auction';
import {AuctionService} from '../../../service/auction/auction.service';
import { ToastrService } from 'ngx-toastr';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-add-auction',
  templateUrl: './add-auction.component.html',
  styleUrls: ['./add-auction.component.scss']
})
export class AddAuctionComponent implements OnInit {
  paintings: Painting[];

  constructor(private httpClient: HttpClient,
              private router: Router,
              private route: ActivatedRoute,
              private toast: ToastrService,
              private photosListService: PhotosListService,
              private auctionService: AuctionService) { }

  ngOnInit() {
    // Fetch All Paintings
    this.photosListService.getAllPainting().subscribe(
    (res: PaintingListResponse) => {
      this.paintings = res.Data;
    }, error => {
      console.log(error);
    });
  }

  mySubmit(form) {
    if (form.invalid) {
      this.toast.error('Error : From Not Valid');
      return false;
    } else {
      const auction: Auction = new Auction();
      auction.name = form.value.name;
      auction.painting = form.value.painting;
      auction.startPrice = form.value.startPrice;
      auction.startDate = form.value.startDate;
      auction.endDate = form.value.endDate;
      console.log(auction);
      this.auctionService.postAddAuction(auction).subscribe(
          data => {
            this.toast.success('Auction Was Successfully Added');
            console.log('the post request was successfully done', data);
          },
          error => {
            this.toast.error('Error Adding Auction, Try Again');
            console.log(error);
          },
          () => {
            // If Success Navigate to Admin Dashboard Page
            this.router.navigate(['/admin/list-auctions']);
          }
      );
    }
  }

}
