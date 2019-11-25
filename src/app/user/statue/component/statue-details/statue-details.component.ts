import {Component, OnInit} from '@angular/core';
import {StatueObject} from '../../entity/statue-object';
import {StatueService} from '../../service/statue.service';
import {ActivatedRoute} from '@angular/router';
import {ArtistListItem} from '../../../artist/entity/artist-list-item';

@Component({
  selector: 'app-statue-details',
  templateUrl: './statue-details.component.html',
  styleUrls: ['./statue-details.component.scss']
})
export class StatueDetailsComponent implements OnInit {
  statueDetails: StatueObject;
  artist: ArtistListItem;
  fullSizeImageActive = false;
  isFavoriteAdded = false;
  secondaryStatues: { secondStatue: string }[] = [];

  // Alternate Fix:
  activePaintingUrl = 'some url';

  // TODO Move This to Interaction Component
  statueView = [];

  constructor(private statueService: StatueService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.url.subscribe(
      urlSegments => {
        this.statueService.getStatueDetails(+urlSegments[1].path).subscribe(
          statueDetails => {
            this.prepareStatuePage(statueDetails);
          }
        );
      }
    );
  }

  prepareStatuePage(statueDetails: StatueObject) {
    this.statueDetails = statueDetails;
    this.activePaintingUrl = statueDetails.image;
    this.secondaryStatues.push({
      secondStatue: statueDetails.image
    });
    this.artist = statueDetails.artist;
  }
  // To Change Main View Image
  setMainPainting(indexOfNewImage: number) {
    this.activePaintingUrl = this.secondaryStatues[indexOfNewImage].secondStatue;
  }

  // region Unimplemented Methods
  addToFavorite() {
    // TODO Implement Favorite Services
  }

  removeFromFavorite() {
    // TODO Implement Favorite Services
  }

  addToWishList() {
    // TODO Implement Add To Wish List Services
  }

  // endregion

  showImageInFullSize() {
    this.fullSizeImageActive = true;
  }

  hideFullScreenMode() {
    this.fullSizeImageActive = false;
  }
}
