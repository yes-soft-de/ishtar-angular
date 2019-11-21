import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs';
import {StatueObject} from '../../entity/statue-object';
import {StatueService} from '../../service/statue.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-statue-details',
  templateUrl: './statue-details.component.html',
  styleUrls: ['./statue-details.component.scss']
})
export class StatueDetailsComponent implements OnInit {
  statueDetails: StatueObject;
  fullSizeImageActive = false;
  isFavoriteAdded = false;
  // TODO Move This to Interaction Component
  statueView = [];
  @ViewChild('fullSizeImage', {static: false}) fullSizeImageRef: ElementRef;

  constructor(private statueService: StatueService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.url.subscribe(
      urlSegments => {
        this.statueService.getStatueDetails(+urlSegments[1].path).subscribe(
          statueDetails => {
            this.statueDetails = statueDetails;
          }
        );
      }
    );
  }

  addToFavorite() {
    // TODO Implement Favorite Services
  }

  removeFromFavorite() {
    // TODO Implement Favorite Services
  }

  addToWishList() {
    // TODO Implement Add To Wish List Services
  }

  // What Does This Do?!!
  setMainPainting(event) {
    const target = event.target || event.srcElement || event.currentTarget;
    const paintingSrc = target.attributes.src;
    const value = paintingSrc.nodeValue;
    const mainImage = document.getElementById('main-img');
    mainImage.setAttribute('src', value);
    document.getElementById('full-size-img').setAttribute('src', value);
  }

  showImageInFullSize() {
    this.fullSizeImageActive = true;
  }

  hideFullScreenMode() {
    this.fullSizeImageActive = false;
  }
}
