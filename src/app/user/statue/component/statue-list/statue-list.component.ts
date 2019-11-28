import {Component, OnInit} from '@angular/core';
import {StatueService} from '../../service/statue.service';
import {StatueObject} from '../../entity/statue-object';
import {Observable} from 'rxjs';
import {StatueListFilterService} from '../../filter/statue-list-filter.service';

@Component({
  selector: 'app-statue-list',
  templateUrl: './statue-list.component.html',
  styleUrls: ['./statue-list.component.scss']
})
export class StatueListComponent implements OnInit {
  statuesList: StatueObject[];
  filteredList: StatueObject[];
  filterService: StatueListFilterService = null;
  magnifiedStatue: number = null;

  constructor(private statueService: StatueService) {
  }

  ngOnInit() {
    this.statueService.getStatueList().subscribe(
      statueList => {
        this.statuesList = statueList;
        this.filteredList = statueList;
        this.filterService = new StatueListFilterService(statueList);
      }
    );
  }

  openList(e) {
    // TODO Implement Open List
  }

  viewStatue(statue) {
    // TODO Implement View Statue
  }

  MagnifyingImage(statueId: number) {
    if (this.magnifiedStatue !== null && this.magnifiedStatue !== undefined) {
      this.magnifiedStatue = null;
    } else {
      this.magnifiedStatue = statueId;
    }
  }

  filterSmallSize() {
    this.filteredList = this.filterService.activateWeightFilter('S');
  }

  filterMediumSize() {
    this.filteredList = this.filterService.activateWeightFilter('M');
  }

  filterBigSize() {
    this.filteredList = this.filterService.activateWeightFilter('L');
  }

  filterMaterial(materialName: string) {
    this.filteredList = this.filterService.activateMaterialFilter(materialName);
  }

  filterArtistName(artistName: string) {
    this.filteredList = this.filterService.activateArtistNameFilter(artistName);
  }

  filterStyleName(styleName: string) {
    this.filteredList = this.filterService.activateStyleNameFilter(styleName);
  }

  noFilter() {
    this.filteredList = this.filterService.deactivateAllFilters();
  }
}
