import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Artist} from '../../../entity/artist/artist';
import {ArtistService} from '../../../service/artist/artist.service';
import {PaintingFullList} from '../../../entity/painting-full-list/painting-full-list';
import {PaintingListItem} from '../../../entity/painting-full-list/painting-list-item';

@Component({
  selector: 'app-artist-page',
  templateUrl: './artist-page.component.html',
  styleUrls: ['./artist-page.component.scss']
})
export class ArtistPageComponent implements OnInit {
  artist: Artist;
  featuredPaintings: PaintingListItem[];

  constructor(private artistService: ArtistService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.artistService.getArtistInfo(
      this.activatedRoute.snapshot.paramMap.get('id')
    ).subscribe(
      data => {
        this.artist = data;
      }
    );

    this.artistService.getArtistPainting(
      this.activatedRoute.snapshot.paramMap.get('id')
    ).subscribe((data: PaintingFullList) => {
      this.featuredPaintings = data.data;
    }, error1 => {
      console.log(error1);
    });
  }

}
