import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {ArtistListItem} from '../../../entity/artist-list/artist-list-item';
import {ArtistService} from '../../../service/artist/artist.service';
import {UserArtTypeService} from '../../../service/art-type/user-art-type.service';
import {ArtTypeListItem} from '../../../entity/art-type-list/art-type-list-item';
import {IshtarInteractionService} from '../../../service/ishtar-interaction/ishtar-interaction.service';

@Component({
  selector: 'app-art-type',
  templateUrl: './art-type.component.html',
  styleUrls: ['./art-type.component.scss', '../../widgets/follow-widget/follow-widget.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ArtTypeComponent implements OnInit {
  @Input() artType: ArtTypeListItem;
  featuredArtists: ArtistListItem[];
  artistLoaded = false;

  constructor(private artistList: ArtistService,
              private activatedRoute: ActivatedRoute,
              private artTypeService: UserArtTypeService,
              private interactionService: IshtarInteractionService,
              private toaster: ToastrService) {
  }

  ngOnInit() {
    // TODO Explaining Why Iterating?!
    this.artTypeService.getAllArtType().subscribe(
      (artTypeList: any) => {
        for (const i of artTypeList.Data) {
          if (i.name === this.activatedRoute.snapshot.paramMap.get('id')) {
            this.artType = i;
          }
        }
      }
    );
    // TODO: Note: Use Cashing For Fetching Artists, It's Used Once By Home Page, So..
    // TODO: But It's Not Ideal to Sync All The Database In the FrontEnd!. Food For Thought!
    this.featuredArtists = [];
    if (this.artType !== null) {
      this.artistList.requestArtistList().subscribe(
        (data: any) => {
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
}
