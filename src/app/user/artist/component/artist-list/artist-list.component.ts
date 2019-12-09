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
  private originalList: ArtistListItem[] = [];
  public activeArtType: string;
  public activeArtist: string;

  public filteredList: ArtistListItem[] = [];
  public activeTypes: string[];
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
        this.filteredList = artists;
        this.originalList = artists;
        this.config.totalItems = artists.length;
        this.calculateActiveArtTypes();
      }
    );
  }

  private calculateActiveArtTypes() {
    this.activeTypes = [...new Set(this.filteredList.map(item => item.artType))];
  }

  pageChanged(event) {
    this.config.currentPage = event;
  }

  // region Filter Functions
  cancelAllFilters() {
    this.activeArtType = null;
    this.activeArtist = null;
    this.filteredList = this.originalList;
  }

  filterByArtType(artTypeName: string) {
    this.activeArtType = artTypeName;
    return this.getFilteredList();
  }

  cancelFilterByArtType() {
    this.activeArtType = null;
    this.filteredList = this.getFilteredList();
  }

  filterByArtistName(artistName: string) {
    this.activeArtist = artistName;
    this.filteredList = this.getFilteredList();
  }

  cancelFilterByArtistName() {
    this.activeArtist = null;
    this.filteredList = this.getFilteredList();
  }

  sortArtistsByFollowerNumberDesc() {
    this.filteredList = this.filterService.sortArtistsByFollowerNumberDesc(this.filteredList);
  }

  sortArtistsByFollowerNumberAsc() {
    this.filteredList = this.filterService.sortArtistsByFollowerNumberAsc(this.filteredList);
  }

  private getFilteredList(): ArtistListItem[] {
    let resultList = this.originalList;
    if (this.activeArtist !== null) {
      resultList = this.filterService.processArtistNameFilter(resultList, this.activeArtist);
    }
    if (this.activeArtType !== null) {
      resultList = this.filterService.processArtTypeFilter(resultList, this.activeArtType);
    }
    return resultList;
  }

  // endregion
}
