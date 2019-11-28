import {Component, Input, OnInit} from '@angular/core';
import {ArtistListItem} from '../../entity/artist-list-item';
import {ArtistService} from '../../service/artist.service';
import {ArtistFilterService} from '../../filter/artist-filter.service';

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

  constructor(private artistService: ArtistService,
              private filterService: ArtistFilterService) {
    this.config = {
      itemsPerPage: 8,
      currentPage: 1,
      totalItems: 0
    };
  }

  ngOnInit() {
    this.artistService.getArtistList().subscribe(
      artists => {
        console.log(artists);
        this.artistList = artists;
        this.config.totalItems = artists.length;
        this.calculateActiveArtTypes();
        this.filterService.setList(artists);
      }
    );
  }

  private calculateActiveArtTypes() {
    // TODO: Use Map Reduce
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
    this.artistList = this.filterService.activateArtTypeNameFilter(name);
  }

  sortArtistsByFollowerNumberDesc() {
    this.artistList = this.filterService.sortArtistsByFollowerNumberDesc();
  }

  sortArtistsByFollowerNumberAsc() {
    this.artistList = this.filterService.sortArtistsByFollowerNumberAsc();
  }

  cancelFilterByArtType() {
    this.artistList = this.filterService.deactivateArtTypeNameFilter();
  }
}
