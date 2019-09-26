import {Component, Input, OnInit} from '@angular/core';
import {ArtistListItem} from '../../../entity/artist-list/artist-list-item';
import {ArtistListService} from '../../../service/artist-list/artist-list.service';
import {UserArtistService} from '../../../service/user-artist-service/user-artist.service';
import {ViewInterface} from '../../../entity/interaction/view.interface';
import {IshtarInteractionService} from '../../../service/ishtar-interaction/ishtar-interaction.service';

@Component({
  selector: 'app-artist-list',
  templateUrl: './artist-list.component.html',
  styleUrls: ['./artist-list.component.scss']
})
export class ArtistListComponent implements OnInit {
  @Input() filter = true;
  @Input() artistListFormatted: ArtistListItem[];
  @Input() search = true;
  public artistList: {
    id: number,
    image: string,
    name: string,
    paintingNumber: number,
    artistFollowers: number
  }[];
  public types: string[] = ['all'];
  public activeArtType: string;
  config: any;  // Config For Paginate
  searchText;
  viewData: ViewInterface = {
    entity: 2,      // 2: For Artist Entity
    row: 0,         // this for Artist id
    interaction: 3, // 3: for view interaction
    client: 1,      // this for client id
  };

  constructor(private interactionService: IshtarInteractionService) { }

  ngOnInit() {
    this.allocateArtTypeList();
    this.types = [...new Set(this.types)];    // create array of types after removing the repeated value
    // Allocate Artist List with Paintings and Views
    this.artistList = [];
    for (const i of this.artistListFormatted) {
      this.artistList.push({
        id: i.id,
        image: i.path,
        name: i.name,
        paintingNumber: 1,
        artistFollowers: 10
      });
    }
    // Create Pagination Config
    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: this.artistList.length
    };
  }
  allocateArtTypeList() {
    // Allocate Art Types
    for (const i of this.artistListFormatted) {
      this.types.push(i.artType);
    }
  }
  // Fetch The Page Number On Page Change
  pageChanged(event) {
    this.config.currentPage = event;
  }

  filterByArtType(name: string) {
    this.activeArtType = name;
    this.artistList = [];
    if (name === 'all') {
      for (const i of this.artistListFormatted) {
        this.artistList.push({
          image: i.path,
          name: i.name,
          paintingNumber: 4,
          artistFollowers: 10,
          id: i.id
        });
      }
    } else {
      for (const i of this.artistListFormatted) {
        if (i.artType === name) {
          this.artistList.push({
            image: i.path,
            name: i.name,
            paintingNumber: 4,
            artistFollowers: 10,
            id: i.id
          });
        }
      }
    }
  }

  // Increase view for Artist
  viewArtist(id: number) {
    this.viewData.row = id;
    this.interactionService.addViewInteraction(this.viewData).subscribe(
      res => {
        console.log('This Artist Was Reviewed', res);
      },
      error => {
        console.log(error);
      }
    );
  }

}
