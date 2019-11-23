import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { ArtistDetails } from '../../entity/artist-details';
import {ArtistService} from '../../service/artist.service';
import {PaintingListItem} from '../../../painting/entity/painting-list-item';

@Component({
  selector: 'app-artist-page',
  templateUrl: './artist-details.component.html',
  styleUrls: ['./artist-details.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ArtistDetailsComponent implements OnInit {
  @Input() randomPaintingForArtist: PaintingListItem;
  artist: ArtistDetails;

  constructor(private activatedRoute: ActivatedRoute,
              private artistService: ArtistService) {
  }

  ngOnInit() {
    this.activatedRoute.url.subscribe(
        urlSegments => {
          this.artistService.getArtist(Number(urlSegments[1].path)).subscribe(
              data => {
                this.artist = data;
                console.log('artist', this.artist);
              }
          );
        }
    );
  }

}
