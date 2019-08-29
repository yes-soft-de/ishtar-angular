import { Component, OnInit } from '@angular/core';
import {ArtistService} from '../../../service/artist/artist.service';
import {Artist} from '../../../entity/artist/artist';
import {ArtistInterface} from '../../../entity/artist/artist-interface';
import { PhotosListService } from '../../../service/PhotosList/photos-list.service';
import { Painting } from '../../../entity/painting/painting';
import { PaintingInterface } from '../../../entity/painting/painting-interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  artists: Artist;
  paintings: Painting;
  
  constructor(private artist: ArtistService,
    private photosListService: PhotosListService) { }

  ngOnInit() {
    // Fetch All Artists Number
    this.artist.getAllArtists().subscribe(
      (data: ArtistInterface) => {
        this.artists = data.Data;
      }, error1 => {
        console.log(error1);
      });
    // Fetch All Paintings
    this.photosListService.getAllPainting().subscribe(
      (res: PaintingInterface) => {
      this.paintings = res.Data;
    }, error1 => {
      console.log(error1);
    });  
  }

}
