import {Component, Input, OnInit} from '@angular/core';
import {ArtistListItem} from '../../entity/artist-list-item';
import {ArtistService} from '../../service/artist.service';

@Component({
  selector: 'app-artist-list',
  templateUrl: './artist-list.component.html',
  styleUrls: ['./artist-list.component.scss']
})
export class ArtistListComponent implements OnInit {
  public artistList: ArtistListItem[] = [];
  public activeTypes: string[];
  public activeArtType: string;
  @Input() search = true;
  @Input() filter = true;
  config: {
    itemsPerPage: number,
    currentPage: number,
    totalItems: number
  };  // Config For Paginate

  constructor(private artistService: ArtistService) {
    this.config = {
      itemsPerPage: 8,
      currentPage: 1,
      totalItems: 0
    };
  }

  ngOnInit() {
    this.artistService.getArtistList().subscribe(
      artists => {
        this.artistList = artists;
        this.config.totalItems = artists.length;
        this.calculateActiveArtTypes();
      }
    );
  }

  private calculateActiveArtTypes() {
    const types: string[] = [];
    for (const artist of this.artistList) {
      types.push(artist.artType);
    }
    this.activeTypes = [...new Set(types)];
  }

  pageChanged(event) {
    this.config.currentPage = event;
  }

  filterByArtType(name: string) {
    this.activeArtType = name;
    this.artistService.filterByArtType(name);
  }

  sortItemsByLargeFollowNumber() {
    this.artistService.sortItemsByLargeFollowNumber();
  }

  sortItemsByLowerFollowNumber() {
    this.artistService.sortItemsByLowerFollowNumber();
  }

  cancelFilterByArtType() {
    this.artistService.cancelFilterArtType();
  }
}
