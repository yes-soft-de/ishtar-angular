import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {ArtistListItem} from '../../../entity/artist-list/artist-list-item';
import {ArtistListService} from '../../../service/artist-list/artist-list.service';
import {ArtTypeDetails} from '../../../entity/art-type-details/art-type-details';
import {UserArtTypeService} from '../../../service/art-type/user-art-type.service';
import {ArtTypeListItem} from '../../../entity/art-type-list/art-type-list-item';
import {IshtarInteractionService} from '../../../service/ishtar-interaction/ishtar-interaction.service';

@Component({
  selector: 'app-art-type',
  templateUrl: './art-type.component.html',
  styleUrls: ['./art-type.component.scss']
})
export class ArtTypeComponent implements OnInit {
  @Input() artType: ArtTypeListItem;
  featuredArtists: ArtistListItem[];
  artistLoaded = false;

  artTypeClapped = false;
  artTypeLiked = false;

  constructor(private artistList: ArtistListService,
              private activatedRoute: ActivatedRoute,
              private artTypeService: UserArtTypeService,
              private interactionService: IshtarInteractionService,
              private toaster: ToastrService) {
  }

  ngOnInit() {
    this.artTypeService.getAllArtType().subscribe(
      artTypeList => {
        for (const i of artTypeList.Data) {
          if (i.name === this.activatedRoute.snapshot.paramMap.get('id')) {
            this.artType = i;
          }
        }
      }
    );
    this.featuredArtists = [];
    if (this.artType !== null) {
      this.artistList.requestArtistList().subscribe(
        data => {
          for (const i of data.Data) {
            if (i.artType === this.artType.name) {
              this.featuredArtists.push(i);
            }
            this.artistLoaded = true;
          }
        }, error1 => {
          this.toaster.error(error1.message);
          this.artistLoaded = false;
        }
      );
    }
  }

  followArtType() {
    this.toaster.success('You Are Now Following the Art Type');
  }

  clapThePainting() {
    this.interactionService.love(`${this.artType.id}`, 'painting');
    this.artTypeClapped = true;
    this.toaster.success('Painting Clapped');
  }

  loveThePainting() {
    this.interactionService.love(`${this.artType.id}`, 'painting');
    this.artTypeLiked = true;
    this.toaster.success('Painting Loved');
  }

}