import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Artist} from '../../../entity/artist/artist';
import {ArtistService} from '../../../service/artist/artist.service';
import {ArtistInterface} from '../../../entity/artist/artist-interface';

@Component({
  selector: 'app-list-artist',
  templateUrl: './list-artist.component.html',
  styleUrls: ['./list-artist.component.scss']
})
export class ListArtistComponent implements OnInit {
  public artists: Artist[];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private artist: ArtistService ) { }

  ngOnInit() {
    // Fetch All Artists
    this.artist.getAllArtists().subscribe(
        (data) => {
            if (data) {
                this.artists = data.Data;
            }
      }, error1 => {
        // TODO think if there is some to do here ex : display message if there is error
        console.log('Error :', error1);
      });

  }

  // Delete The Artist
  delete(artistId) {
    this.artist.deleteArtist(artistId).subscribe(
      data => {
        console.log('the delete request was successfully done', data);
        this.router.navigate(['/admin/list-artists']);
      },
      error => {
        console.log('Sorry There Is Error : ', error);
      },
        () => {
        console.log('done');
        this.router.navigate(['../'], {relativeTo: this.route});
        }
    );
  }

}
