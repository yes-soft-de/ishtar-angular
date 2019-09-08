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

  activeArtType: string;

  constructor(private activatedRoute: ActivatedRoute,
              private artistPaintings: PaintingListService,
              private artistDetails: UserArtistService,
              private toaster: ToastrService) {
  }

  ngOnInit() {
    this.artistDetails.requestArtistDetails(this.activatedRoute.snapshot.paramMap.get('id')).subscribe(
      data => {
        this.artist = data.Data;
      }, error1 => {
        console.log(error1);
      }
    );
    this.artistPaintings.requestPaintingListByArtist(this.activatedRoute.snapshot.paramMap.get('id')).subscribe(
      data => {
        this.featuredPaintings = data.Data;
        this.artistMainPainting = this.featuredPaintings[Math.random() * 100 % this.featuredPaintings.length];
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
