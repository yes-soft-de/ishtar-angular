import {Component, OnInit} from '@angular/core';
import {ArtistListService} from '../../../service/artist-list/artist-list.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-artist-list-page',
  templateUrl: './artist-list-page.component.html',
  styleUrls: ['./artist-list-page.component.scss']
})
export class ArtistListPageComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
