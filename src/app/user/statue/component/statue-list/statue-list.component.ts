import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {StatueService} from '../../service/statue.service';
import {StatueObject} from '../../entity/statue-object';
import {StatueListFilterService} from '../../filter/statue-list-filter.service';

@Component({
  selector: 'app-statue-list',
  templateUrl: './statue-list.component.html',
  styleUrls: ['./statue-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class StatueListComponent implements OnInit {
  statuesList: StatueObject[];
  filteredList: StatueObject[];
  magnifiedStatue: number = null;
  magnifyingImage = false;

  // region Filters Keywords, Java Style for Class Members Naming :)
  private mArtistNameFilter: string = null;
  private mMaterialFilter: string = null;
  private mWeightFilter: string = null;
  private mStyleFilter: string = null;

  // endregion

  constructor(private statueService: StatueService, private filterService: StatueListFilterService) {
  }

  ngOnInit() {
    this.statueService.getStatueList().subscribe(
      statueList => {
        this.statuesList = statueList;
        this.filteredList = statueList;
      }
    );
  }

  openList(e) {
    // TODO Implement Open List
  }

  viewStatue(statue) {

  }

  MagnifyingImage(statueId: number) {
    const INFO_ID: string = 'info_' + statueId;
    if (this.magnifyingImage) {
      document.getElementById(INFO_ID).style.display = 'block';
      this.magnifyingImage = false;
    } else {
      document.getElementById(INFO_ID).style.display = 'none';
      this.magnifyingImage = true;
    }
  }

  // region Filter Functions
  filterSmallSize() {
    this.mWeightFilter = 'S';
    this.filteredList = this.getFilteredList();
  }

  filterMediumSize() {
    this.mWeightFilter = 'M';
    this.filteredList = this.getFilteredList();
  }

  filterBigSize() {
    this.mWeightFilter = 'L';
    this.filteredList = this.getFilteredList();
  }

  cancelSizeFilter() {
    this.mWeightFilter = null;
    this.filteredList = this.getFilteredList();
  }

  filterMaterial(materialName: string) {
    this.mMaterialFilter = materialName;
    this.filteredList = this.getFilteredList();
  }

  cancelMaterialFilter() {
    this.mMaterialFilter = null;
    this.filteredList = this.getFilteredList();
  }

  filterArtistName(artistName: string) {
    this.mArtistNameFilter = artistName;
    this.filteredList = this.getFilteredList();
  }

  cancelArtistNameFilter() {
    this.mArtistNameFilter = null;
    this.filteredList = this.getFilteredList();
  }

  filterStyleName(styleName: string) {
    this.mStyleFilter = styleName;
    this.filteredList = this.getFilteredList();
  }

  cancelStyleNameFilter() {
    this.filteredList = null;
    this.filteredList = this.getFilteredList();
  }

  noFilter() {
    this.mMaterialFilter = null;
    this.mArtistNameFilter = null;
    this.mWeightFilter = null;
    this.filteredList = this.getFilteredList();
  }

  private getFilteredList(): StatueObject[] {
    let resultList = this.statuesList;
    if (this.mArtistNameFilter !== null) {
      resultList = this.filterService.processArtistNameFilter(resultList, this.mArtistNameFilter);
    }
    if (this.mMaterialFilter !== null) {
      resultList = this.filterService.processMaterialFilter(resultList, this.mMaterialFilter);
    }
    if (this.mWeightFilter !== null) {
      resultList = this.filterService.processWeightFilter(resultList, this.mWeightFilter);
    }
    if (this.mStyleFilter !== null) {
      resultList = this.filterService.processStyleFilter(resultList, this.mStyleFilter);
    }
    return resultList;
  }

  // endregion
}
