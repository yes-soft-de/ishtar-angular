import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PaintingListItem} from '../../../entity/painting-list/painting-list-item';
import {ArtistDetails} from '../../../entity/artist/artist-details';
import {PaintingListService} from '../../../service/painting-list/painting-list.service';
import {UserProfileService} from '../../../service/client-profile/user-profile.service';

@Component({
  selector: 'app-artist-page',
  templateUrl: './artist-details.component.html',
  styleUrls: ['./artist-details.component.scss']
})
export class ArtistDetailsComponent implements OnInit {
  @Input() featuredPaintings: PaintingListItem[];
  @Input() artist: ArtistDetails;
  artistMainPainting: PaintingListItem;

  constructor(private userProfileService: UserProfileService,
              private activatedRoute: ActivatedRoute,
              private artistPaintings: PaintingListService) {
  }

  ngOnInit() {
    this.artistPaintings.requestPaintingListByArtist(this.activatedRoute.snapshot.paramMap.get('id')).subscribe(
      data => {
        this.featuredPaintings = data.Data;
        const random = `${Math.random() * 100}`;
        const randPainting = parseInt(random, 10) % this.featuredPaintings.length;
        this.artistMainPainting = this.featuredPaintings[randPainting];
        console.log(this.artistMainPainting);
      }, error1 => {
        console.log(error1);
      }
    );
  }
}
