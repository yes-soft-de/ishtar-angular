import {Component, Input, OnInit} from '@angular/core';
import {PaintingDetails} from '../../../entity/painting-details/painting-details';
import {PaintingListItem} from '../../../entity/painting-list/painting-list-item';
import {PaintingListService} from '../../../service/painting-list/painting-list.service';
import {IshtarInteractionService} from '../../../service/ishtar-interaction/ishtar-interaction.service';
import {ToastrService} from 'ngx-toastr';
import {InteractionConsts} from '../../../consts/interaction/interaction-consts';
import {LoveService} from '../../../service/love/love.service';

@Component({
  selector: 'app-painting-details',
  templateUrl: './painting-details.component.html',
  styleUrls: ['./painting-details.component.scss']
})
export class PaintingDetailsComponent implements OnInit {
  @Input() painting: PaintingDetails;
  featuredList: PaintingListItem[];
  // activePaintingImage: string;

  paintingLiked = this.loveService.loved;
  paintingClapped = false;

  constructor(private paintingService: PaintingListService,
              private loveService: LoveService,
              private toaster: ToastrService) {
    // this.activePaintingImage = this.painting.image;
  }

  ngOnInit() {
    this.paintingService.requestPaintingList().subscribe(
      data => {
        this.featuredList = data.Data;
      }
    );
  }

  loveThePainting() {
    this.loveService.initLove(this.painting.id, InteractionConsts.ENTITY_TYPE_PAINTING);
  }

  setMainPainting(img: string) {
    // this.activePaintingImage = img;
  }

  showImageInFullSize() {
    document.getElementById('full-size-img').classList.add('active');
  }

  hideFullScreenMode() {
    document.getElementById('full-size-img').classList.remove('active');
  }

}
