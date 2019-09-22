import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PaintingListItem} from '../../../entity/painting-list/painting-list-item';
import {ArtistDetails} from '../../../entity/artist/artist-details';
import {PaintingListService} from '../../../service/painting-list/painting-list.service';
import {UserArtistService} from '../../../service/user-artist-service/user-artist.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-artist-page',
  templateUrl: './artist-details.component.html',
  styleUrls: ['./artist-details.component.scss']
})
export class ArtistDetailsComponent implements OnInit {
  @Input() featuredPaintings: PaintingListItem[];
  @Input() artist: ArtistDetails;
  artistMainPainting: PaintingListItem;

  constructor(private activatedRoute: ActivatedRoute,
              private artistPaintings: PaintingListService,
              private artistDetails: UserArtistService,
              private toaster: ToastrService) {
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
    // Get Artist Paintings
  }

  followArtist() {
    this.toaster.success('Following!');
  }
}
