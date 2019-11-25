import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {PaintingService} from '../../../service/painting/painting.service';
import {PaintingListItem} from '../../../entity/painting-list/painting-list-item';
import {PaintingDetails} from '../../../entity/painting-details/painting-details';
import {ToastrService} from 'ngx-toastr';
import {UserArtTypeService} from '../../../service/art-type/user-art-type.service';
import {ArtistService} from '../../../service/artist/artist.service';
import {forkJoin, Observable} from 'rxjs';

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
  nextPaintingExistsPage = false;
  prevPaintingExistsPage = false;

  constructor(private toaster: ToastrService,
              private activatedRoute: ActivatedRoute,
              private paintingService: PaintingService,
              private artistListService: ArtistService,
              private artTypeService: UserArtTypeService,
              private router: Router) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.fetchPaintingData();
        window.scroll(0, 0);
      }
    });
  }

  ngOnInit() {
    this.fetchPaintingData();
  }

  private fetchPaintingData() {
    const paintingID = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    // Fetch All Paintings
    const allPaintingsObservable: Observable<any> = this.paintingService.requestPaintingList();
    // Fetch This Painting Details
    const paintingDetailsObservable: Observable<any> = this.paintingService.requestPaintingDetails(paintingID);
    // Fetch All Artist To Select The Artist For This Painting
    const artistForThisPaintingObservable: Observable<any> = this.artistListService.requestArtistList();
    // Fetch The Next Painting To Check If The Id Is Correct Or Not
    const nextPaintingObservable: Observable<any> = this.paintingService.requestPaintingDetails(paintingID + 1);
    // Fetch The Prev Painting To Check If The Id Is Correct Or Not
    const prevPaintingObservable: Observable<any> = this.paintingService.requestPaintingDetails(paintingID - 1);
    const combinedObservable = forkJoin(
        allPaintingsObservable,
        paintingDetailsObservable,
        artistForThisPaintingObservable,
        nextPaintingObservable,
        prevPaintingObservable
    );
    // subscribe all Observable
    combinedObservable.subscribe((data: any) => {
      this.formattedList = data[0].Data;
      this.paintingDetails = data[1].Data;
      data[2].Data.map(res => {
        if (res.name === this.paintingDetails['0'].artist) {
          this.artistDetail = res;
          console.log('Artist For This Painting: ', this.artistDetail);
        }
      });
      this.nextPaintingExistsPage = !data[3].Data[0] ? false : true;
      this.prevPaintingExistsPage = !data[4].Data[0] ? false : true;
      console.log('Next Painting: ', this.nextPaintingExistsPage);
      console.log('Prev Painting: ', this.prevPaintingExistsPage);
    });
  }

}
