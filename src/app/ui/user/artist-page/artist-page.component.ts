import {Component, OnInit} from '@angular/core';
import {NetworkConnectorService} from '../../../service/NetworkConnectorService/network-connector.service';
import {ActivatedRoute} from '@angular/router';
import {ArtistInterface} from '../../../entity/artist/artist-interface';
import {Artist} from '../../../entity/artist/artist';
import {ArtistFeaturedInterface} from '../../../entity/artist-painting/artist-featured-interface';
import {ArtistFeatured} from '../../../entity/artist-painting/artist-featured';
import {PhotosListService} from '../../../service/PhotosList/photos-list.service';

@Component({
  selector: 'app-artist-page',
  templateUrl: './artist-page.component.html',
  styleUrls: ['./artist-page.component.scss']
})
export class ArtistPageComponent implements OnInit {
  artist: Artist;
  featuredPaintings: ArtistFeatured;
  artistInfoSwitcher = true;
  private photos;

  constructor(private photosService: PhotosListService, private activatedRoute: ActivatedRoute,
              private networkClient: NetworkConnectorService) {
  }

  ngOnInit() {

    this.photosService.getPhotosList().subscribe(
      data => {
        this.photos = data.data.slice(0, 3);
      }
    );

    this.networkClient.requestArtistDetails(
      this.activatedRoute.snapshot.paramMap.get('id')
    ).subscribe((data: ArtistInterface) => {
      this.artist = data;
    }, error1 => {
      console.log(error1);
    });

    this.networkClient.requestArtistFeatured(
      this.activatedRoute.snapshot.paramMap.get('id')
    ).subscribe((data: ArtistFeaturedInterface) => {
      this.featuredPaintings = data;
      console.log(data);
    }, error1 => {
      console.log(error1);
    });
  }

}
