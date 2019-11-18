import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PaintingListItem} from '../../../entity/painting-list/painting-list-item';
import {ArtistDetails} from '../../../entity/artist/artist-details';
import {UserProfileService} from '../../../service/client-profile/user-profile.service';
import Flickity from 'flickity';
import {ArtistManagerService} from '../../../manager/artist/artist-manager.service';
import {ArtistObject} from '../../../entity-protected/artist/artist-object';


/**
 * This component Need Refactoring As Follows:
 * 1. Create Presenter That Deals With All The Managers This component Deals With
 */
@Component({
  selector: 'app-artist-page',
  templateUrl: './artist-details.component.html',
  styleUrls: ['./artist-details.component.scss', '../../widgets/follow-widget/follow-widget.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ArtistDetailsComponent implements OnInit {
  // TODO Move Loading To This Component, Avoid Inputs Since It Require Page Loading Things
  @Input() featuredPaintings: PaintingListItem[]; // Fetch All Painting
  @Input() artistMainPainting: PaintingListItem;
  @Input() paintingSlides: any;             // For Storing Paintings and separate it to 4 pieces
  @Input() nextArtistExists: boolean;
  @Input() prevArtistExists: boolean;

  artist: ArtistObject;

  constructor(private userProfileService: UserProfileService,
              private artistManager: ArtistManagerService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    console.log('Artist list: ', this.artist);
  }

  ngOnInit() {
    this.activatedRoute.url.subscribe(
      urlSegments => {
        // Since The Route For This to Show Is /artist/:id, then the second path is the Id of the Artist
        // Load Artist
        this.artistManager.getArtist(urlSegments[1].path);
      }
    );
    this.artistManager.getDetailsObservable().subscribe(
      artistDetails => {
        this.artist = artistDetails;
      }
    );

    // region Remove This, Migrate to TS Scripts
    if (window.innerWidth < 768) {
      const flkty = new Flickity('.main-carousel', {
        draggable: true,
        wrapAround: true,
        prevNextButtons: false,
        pageDots: false
      });
      flkty.on('dragEnd', (event, pointer) => {
        if (pointer.clientX < -10 && this.nextArtistExists) {
          this.goNext();
        }
        if (pointer.clientX > 30 && this.prevArtistExists) {
          this.goBack();
        }
      });
    }

    // endregion
  }

  // TODO: The Database is Not Counting Up, Consider Case of id:2 available, id:3 is not, id:4 available!
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
