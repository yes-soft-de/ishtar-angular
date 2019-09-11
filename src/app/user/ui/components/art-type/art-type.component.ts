import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {ArtistListItem} from '../../../entity/artist-list/artist-list-item';
import {ArtistListService} from '../../../service/artist-list/artist-list.service';
import {ArtTypeDetails} from '../../../entity/art-type-details/art-type-details';
import {UserArtTypeService} from '../../../service/art-type/user-art-type.service';

@Component({
  selector: 'app-art-type',
  templateUrl: './art-type.component.html',
  styleUrls: ['./art-type.component.scss']
})
export class ArtTypeComponent implements OnInit {
  @Input() artType: ArtTypeDetails;
  featuredArtists: ArtistListItem[];
  imagesLoaded = false;

  constructor(private artistList: ArtistListService,
              private activatedRoute: ActivatedRoute,
              private artTypeService: UserArtTypeService,
              private toaster: ToastrService) {
  }

  ngOnInit() {
    this.artTypeService.requestArtTypeDetails(
      this.activatedRoute.snapshot.paramMap.get('id')
    ).subscribe(
      data => {
        this.artType = data.Data;
      }, error1 => {
        this.toaster.error(error1.message);
      }
    );
    this.artistList.requestPaintingListByArtType(
      this.activatedRoute.snapshot.paramMap.get('id')
    ).subscribe(
      data => {
        this.featuredArtists = data.Data;
        this.imagesLoaded = true;
      }, error1 => {
        this.toaster.error(error1.message);
        this.imagesLoaded = false;
      }
    );
  }

  followArtType() {
  }
}
