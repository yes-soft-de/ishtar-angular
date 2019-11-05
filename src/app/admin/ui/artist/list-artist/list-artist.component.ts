import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ArtistService} from '../../../service/artist/artist.service';
import {Subscription} from 'rxjs';
import {ArtistListResponse} from '../../../entity/ArtistList/artist-list-response';
import {ArtistInterface} from '../../../entity/artist/artist-interface';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-list-artist',
  templateUrl: './list-artist.component.html',
  styleUrls: ['./list-artist.component.scss']
})
export class ListArtistComponent implements OnInit, OnDestroy {
  public artists: {0: ArtistInterface, path: string, artType: string}[];
  allArtistObservable: Subscription;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private toaster: ToastrService,
              private artist: ArtistService ) { }

  ngOnInit() {
    this.getArtists();
  }

  ngOnDestroy() {
    this.allArtistObservable.unsubscribe();
  }

  getArtists() {
    // Fetch All Artists
    this.allArtistObservable = this.artist.getAllArtists().subscribe(
        (data: ArtistListResponse) => {
          if (data) {
            this.artists = data.Data;
            console.log(data);
          }
        }, error1 => {
          // TODO think if there is some to do here ex : display message if there is error
          console.log('Error :', error1);
        });
  }


  // Delete The Artist
  delete(artistId: number) {
    if (confirm('Are You Sure You Want To Delete This Artist')) {
      this.artist.deleteArtist(artistId).subscribe(
          data => {
            this.toaster.success('Artist Successfully Deleted');
            console.log('deleted Successfully: ', data);
          },
          error => {
            console.log('error : ', error);
            this.toaster.error('There Is An Error Please Try Again');
          }, () => {
            this.getArtists();
          }
      );
    } else {
      return false;
    }
  }

}
