import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {PaintingDetailsService} from '../../../service/painting-details/painting-details.service';
import {PaintingListService} from '../../../service/painting-list/painting-list.service';
import {PaintingListItem} from '../../../entity/painting-list/painting-list-item';
import {PaintingDetails} from '../../../entity/painting-details/painting-details';
import {ToastrService} from 'ngx-toastr';
import {UserArtTypeService} from '../../../service/art-type/user-art-type.service';
import {ArtistListService} from '../../../service/artist-list/artist-list.service';

@Component({
  selector: 'app-painting',
  templateUrl: './painting-details-page.component.html',
  styleUrls: ['./painting-details-page.component.scss']
})
export class PaintingDetailsPageComponent implements OnInit {
  paintingDetails: PaintingDetails;
  artistDetail: any;
  navigationSubscription;
  formattedList: PaintingListItem[];

  constructor(private toaster: ToastrService,
              private activatedRoute: ActivatedRoute,
              private paintingDetailsService: PaintingDetailsService,
              private paintingService: PaintingListService,
              private artistListService: ArtistListService,
              private artTypeService: UserArtTypeService,
              private router: Router) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.getPaintingDetails();
        this.getArtistForThisPainting();
        window.scroll(0, 0);
      }
    });
  }

  ngOnInit() {
    this.getAllPaintings();
    this.getPaintingDetails();
  }


  // Fetch All Paintings
  private getAllPaintings() {
    this.paintingService.requestPaintingList().subscribe(
        (data: any) => {
        this.formattedList = data.Data;
      }, error1 => {
        console.log(error1);
      }
    );
  }

  // Fetch Painting detail
  private getPaintingDetails() {
    this.paintingDetailsService.requestPaintingDetails(
      this.activatedRoute.snapshot.paramMap.get('id')
    ).subscribe(
        (data: {Data: PaintingDetails}) => {
        this.paintingDetails = data.Data;
      }
    );
  }

  private getArtistForThisPainting() {
    // Fetch Artist ID
    this.artistListService.requestArtistList().subscribe(
        (data: any) => {
          data.Data.map(res => {
            if (res.name === this.paintingDetails[0].artist) {
              this.artistDetail = res;
              console.log('Artist For This Painting: ', this.artistDetail, this.artistDetail.path);
            }
          });
        }
    );
  }
}
