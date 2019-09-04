import {Component, OnInit} from '@angular/core';
import {ArtistListItem} from '../../../entity/artist-list/artist-list-item';
import {ArtistListService} from '../../../service/artist-list/artist-list.service';

@Component({
  selector: 'app-artist-list',
  templateUrl: './artist-list.component.html',
  styleUrls: ['./artist-list.component.scss']
})
export class ArtistListComponent implements OnInit {
  public artistList: any;

  constructor(private artistService: ArtistListService) {
  }

  ngOnInit() {
    this.artistService.requestPaintingList().subscribe(
      data => {
        this.artistList = data.Data;
      }, error => {
        console.log(error);
      }
    );
  }

}
