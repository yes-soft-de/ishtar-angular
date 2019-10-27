import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {PaintingListItem} from '../../../entity/painting-list/painting-list-item';
import {ArtistDetails} from '../../../entity/artist/artist-details';
import {UserProfileService} from '../../../service/client-profile/user-profile.service';

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
  }

  ngOnInit() {}

  // Navigate To Previous Artist
  goBack() {
    const prevId = this.artist.id - 1;
    this.router.navigate(['/artist', prevId]);
  }

  // Navigate To Next Artist
  goNext() {
    const nextId = this.artist.id + 1;
    this.router.navigate(['/artist', nextId]);
  }

}
