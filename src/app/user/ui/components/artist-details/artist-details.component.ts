import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {PaintingListItem} from '../../../entity/painting-list/painting-list-item';
import {ArtistDetails} from '../../../entity/artist/artist-details';
import {UserProfileService} from '../../../service/client-profile/user-profile.service';
import Flickity from 'flickity';

@Component({
  selector: 'app-artist-page',
  templateUrl: './artist-details.component.html',
  styleUrls: ['./artist-details.component.scss', '../../widgets/follow-widget/follow-widget.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ArtistDetailsComponent implements OnInit {
  @Input() featuredPaintings: PaintingListItem[]; // Fetch All Painting
  @Input() artist: ArtistDetails;
  @Input() artistMainPainting: PaintingListItem;
  @Input() paintingSlides: any;             // For Storing Paintings and separate it to 4 pieces
  @Input() nextArtistExists: boolean;
  @Input() prevArtistExists: boolean;

  constructor(private userProfileService: UserProfileService,
              private router: Router) {
    console.log('ARtist list: ', this.artist);
  }

  ngOnInit() {
    if (window.innerWidth < 768) {
      const flkty = new Flickity('.main-carousel', {
        draggable: true,
        wrapAround: true,
        prevNextButtons: false,
        pageDots: false
      });
      flkty.on( 'dragEnd', ( event, pointer ) => {
        if (pointer.layerX < 0 && this.nextArtistExists) {
          this.goNext();
        }
        if (pointer.layerX > 0 && this.prevArtistExists) {
          this.goBack();
        }
      });
    }
  }

  // Navigate To Previous Artist
  public goBack() {
    const prevId = this.artist.id - 1;
    this.router.navigate(['/artist', prevId]);
  }

  // Navigate To Next Artist
  public goNext() {
    const nextId = this.artist.id + 1;
    this.router.navigate(['/artist', nextId]);
  }

}
