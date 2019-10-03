import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {PaintingDetailsService} from '../../../service/painting-details/painting-details.service';
import {PaintingDetails} from '../../../entity/painting-details/painting-details';
import {ToastrService} from 'ngx-toastr';
import {PaintingListItem} from '../../../entity/painting-list/painting-list-item';
import {UserArtTypeService} from '../../../service/art-type/user-art-type.service';

@Component({
  selector: 'app-painting',
  templateUrl: './painting-details-page.component.html',
  styleUrls: ['./painting-details-page.component.scss']
})
export class PaintingDetailsPageComponent implements OnInit {
  paintingDetails: PaintingDetails;
  navigationSubscription;

  constructor(private toaster: ToastrService,
              private activatedRoute: ActivatedRoute,
              private paintingDetailsService: PaintingDetailsService,
              private artTypeService: UserArtTypeService,
              private router: Router) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.getPaintingDetails();
        window.scroll(0, 0);
      }
    });
  }

  ngOnInit() {
    this.getPaintingDetails();
  }

  getPaintingDetails() {
    this.paintingDetailsService.requestPaintingDetails(
      this.activatedRoute.snapshot.paramMap.get('id')
    ).subscribe(
      data => {
        this.paintingDetails = data.Data[0];
      }
    );
  }
}
