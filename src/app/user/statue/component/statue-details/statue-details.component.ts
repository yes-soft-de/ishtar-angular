import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {StatueObject} from '../../entity/statue-object';
import {StatueService} from '../../service/statue.service';
import {ActivatedRoute} from '@angular/router';
import {ArtistService} from '../../../artist/service/artist.service';
import {ArtistDetails} from '../../../artist/entity/artist-details';

@Component({
  selector: 'app-statue-details',
  templateUrl: './statue-details.component.html',
  styleUrls: ['./statue-details.component.scss']
})
export class StatueDetailsComponent implements OnInit {
  @ViewChild('mainImg', {read: ElementRef, static: true}) mainImg: ElementRef;
  @ViewChild('fullSizeImage', {static: false}) fullSizeImageRef: ElementRef;
  statueDetails: StatueObject;
  artist: ArtistDetails;
  fullSizeImageActive = false;
  isFavoriteAdded = false;
  secondaryStatues: {secondStatue: string}[] = [];
  // TODO Move This to Interaction Component
  statueView = [];

  constructor(private statueService: StatueService,
              private artistService: ArtistService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.url.subscribe(
      urlSegments => {
        this.statueService.getStatueDetails(+urlSegments[1].path).subscribe(
          statueDetails => {
            this.statueDetails = statueDetails;
            console.log(statueDetails);
            // Loop To Catch The Secondary Images For This Painting
            for (let num = 2; num < 6; num++) {
              if (this.statueDetails[num]) {
                this.secondaryStatues.push({
                  secondStatue: this.statueDetails[num].image
                });
              }
            }
            // Fetch Artist For This Painting
            // TODO there is painting number for this artist messing
            this.artistService.getArtist(this.statueDetails.artist.id).subscribe(
                res => {
                  this.artist = res;
                  console.log('Artist Detail : ', this.artist);
                }
            );
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
    const value = paintingSrc.nodeValue;                // Get src attribute for Current Element
    this.mainImg.nativeElement.src = value;             // Set The src attribute value to MainImage
    this.fullSizeImageRef.nativeElement.src = value;    // Set The src attribute value to FullSizeImage
  }

  showImageInFullSize() {
    this.fullSizeImageActive = true;
  }

  hideFullScreenMode() {
    this.fullSizeImageActive = false;
  }
}
