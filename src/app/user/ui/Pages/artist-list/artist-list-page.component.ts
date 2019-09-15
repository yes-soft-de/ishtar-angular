import {Component, OnInit} from '@angular/core';
import {ArtistListService} from '../../../service/artist-list/artist-list.service';
import {ToastrService} from 'ngx-toastr';
import {ArtistListItem} from '../../../entity/artist-list/artist-list-item';

@Component({
  selector: 'app-artist-list-page',
  templateUrl: './artist-list-page.component.html',
  styleUrls: ['./artist-list-page.component.scss']
})
export class ArtistListPageComponent implements OnInit {
  artistList: ArtistListItem[];

  constructor(private artistService: ArtistListService) {
  }

  ngOnInit() {
    this.requestArtistList();
  }
  requestArtistList() {
    this.artistService.requestArtistList().subscribe(
      data => {
        this.artistList = data.Data;
        // console.log(JSON.stringify(data.Data));
      }, error1 => {
        this.requestArtistList();
      });
  }

}
