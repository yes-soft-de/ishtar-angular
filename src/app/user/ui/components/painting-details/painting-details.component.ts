import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {PaintingDetails} from '../../../entity/painting-details/painting-details';
import {PaintingListItem} from '../../../entity/painting-list/painting-list-item';
import {PaintingService} from '../../../service/painting/painting.service';
import {PaintingViewsItem} from '../../../entity/painting-views/painting-views-item';
import {IshtarInteractionService} from '../../../service/ishtar-interaction/ishtar-interaction.service';
import {ToastrService} from 'ngx-toastr';
import {ArtistService} from '../../../service/artist/artist.service';
import {Router} from '@angular/router';
import {Flickity} from 'flickity';

@Component({
  selector: 'app-painting-details',
  templateUrl: './painting-details.component.html',
  styleUrls: ['./painting-details.component.scss', '../../widgets/follow-widget/follow-widget.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PaintingDetailsComponent implements OnInit {
  @Input() painting: PaintingDetails;
  @Input() artist: any;
  @Input() paintingList: PaintingListItem[];
  featuredList: PaintingListItem[];
  paintingViews: PaintingViewsItem;
  paintingNumber: number;
  CurrentPaintingId: number;

  constructor(private paintingService: PaintingService,
              private interactionService: IshtarInteractionService,
              private artistListService: ArtistService,
              private toaster: ToastrService,
              private router: Router) {
  }

  ngOnInit() {
    // this.paintingService.requestPaintingList().subscribe(
    //   data => {
    //     this.featuredList = data.Data;
    //   }
    // );
    if (window.innerWidth < 768) {
      var flkty = new Flickity('.main-carousel', {
        draggable: true,
        wrapAround: true,
        prevNextButtons: false,
        pageDots: false
      });
      flkty.on('dragEnd', (event, pointer) => {
        if (pointer.layerX < -10) {
          this.goNext();
        }
        if (pointer.layerX > 30) {
          this.goBack();
        }
      });

    }
    if (document.readyState === 'complete') {
      if (this.painting[0].name == null) {
        document.getElementById('painting-name').style.display = 'none';
      }

      if ((this.painting[0].height == null) || (this.painting[0].width == null)) {
        document.getElementById('painting-size').style.display = 'none';
      }

      if (this.painting[0].colorsType == null) {
        document.getElementById('painting-type').style.display = 'none';
      }

      if (this.painting[0].story == null) {
        document.getElementById('painting-story').style.display = 'none';
      }

      if (this.painting[0].artist == null) {
        document.getElementById('painting-artist').style.display = 'none';
      }
    }
    this.CurrentPaintingId = this.painting[0].id;
  }

  addToWishList() {
    this.interactionService.addToWishList(`${this.painting[0].id}`, 'painting');
    this.toaster.success('Painting Added To Your Wish List');
  }


  setMainPainting(event) {
    const target = event.target || event.srcElement || event.currentTarget;
    const paintingSrc = target.attributes.src;
    const value = paintingSrc.nodeValue;
    const mainImage = document.getElementById('main-img');
    mainImage.setAttribute('src', value);
    document.getElementById('full-size-img').setAttribute('src', value);
  }

  showImageInFullSize() {
    document.getElementById('full-size-img').classList.add('active');
  }

  hideFullScreenMode() {
    document.getElementById('full-size-img').classList.remove('active');
  }

  goBack() {
    for (let i = 0; i < this.paintingList.length; i++) {
      // tslint:disable-next-line:triple-equals
      if (this.paintingList[i].id == this.CurrentPaintingId) {
        this.paintingNumber = i - 1;
      }
    }
    if (this.paintingNumber > 0) {
      this.router.navigate(['/painting', this.paintingList[this.paintingNumber].id]);
      this.CurrentPaintingId = this.paintingList[this.paintingNumber].id;
    } else {
      this.router.navigate(['/painting', this.paintingList[this.paintingList.length - 1].id]);
      this.CurrentPaintingId = this.paintingList[this.paintingList.length - 1].id;
    }
  }

  goNext() {
    for (let i = 0; i < this.paintingList.length; i++) {
      // tslint:disable-next-line:triple-equals
      if (this.paintingList[i].id == this.CurrentPaintingId) {
        this.paintingNumber = i + 1;
      }
    }
    if (this.paintingNumber < this.paintingList.length - 1) {
      this.router.navigate(['/painting', this.paintingList[this.paintingNumber].id]);
      this.CurrentPaintingId = this.paintingList[this.paintingNumber].id;
    } else {
      this.router.navigate(['/painting', this.paintingList[0].id]);
      this.CurrentPaintingId = this.paintingList[0].id;
    }
  }

}
