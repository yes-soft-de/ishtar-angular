import {Component, Input, OnInit} from '@angular/core';
import {PaintingListItem} from '../../../entity/painting-list/painting-list-item';
import {PaintingService} from '../../service/painting.service';
import {PaintingFilterService} from '../../filter/painting-filter.service';
import {PageTypeToNumberService} from '../../../shared/helper/page-type-to-number.service';

@Component({
  selector: 'app-painting-list',
  templateUrl: './painting-list.component.html',
  styleUrls: ['./painting-list.component.scss']
})
export class PaintingListComponent implements OnInit {
  @Input() filter = true;
  public artists: string[];
  public artTypes: string[];
  originalList: PaintingListItem[];
  paintingList: PaintingListItem[];
  config: any;
  filterActiveArtist: string = null;
  filterActiveArtType: string = null;


  paintingsView: {
    id: number,
    viewNumber: number
  }[] = [];
  paintingsLove: {
    id: number,
    loveNumber: number
  }[] = [];

  constructor(private paintingService: PaintingService,
              private filterService: PaintingFilterService) {
  }

  ngOnInit() {
    this.paintingService.getPaintings().subscribe(
      paintingList => {

        this.originalList = paintingList;
        console.log('NgxPaginationModule', paintingList);
        this.paintingList = paintingList;
        this.config = {
          itemsPerPage: 12,
          currentPage: 1,
          totalItems: this.paintingList.length
        };

        this.getArtistNamesList();
        this.getArtTypesList();
      }
    );
  }

  pageChanged(event) {
    this.config.currentPage = event;
  }

  public filterByArtType(name: string) {
    this.filterActiveArtType = name;
    this.paintingList = this.getFilteredList();
  }

  public disableArtTypeFilter() {
    this.filterActiveArtType = null;
    this.paintingList = this.getFilteredList();
  }

  public filterByArtist(name: string) {
    this.filterActiveArtist = name;
    this.paintingList = this.getFilteredList();
  }

  public disableArtistNameFilter() {
    this.filterActiveArtist = null;
    this.paintingList = this.getFilteredList();
  }

  viewImage(paintingId: number) {
    // TODO Implement View Image Function
    // Dependent on Reaction
    this.paintingService.viewPainting(PageTypeToNumberService.ENTITY_TYPE_PAINTING, paintingId);
  }

  getArtistNamesList() {
    this.artists = [...new Set(this.paintingList.map(painting => painting.artist))];
  }

  getArtTypesList() {
    this.artTypes = [...new Set(this.paintingList.map(painting => painting.artType))];
  }

  private getFilteredList(): PaintingListItem[] {
    let resultList = this.paintingList;
    if (this.filterActiveArtist !== null) {
      resultList = this.filterService.processArtistNameFilter(resultList, this.filterActiveArtist);
    }
    if (this.filterActiveArtType !== null) {
      resultList = this.filterService.processArtTypeFilter(resultList, this.filterActiveArtType);
    }
    return resultList;
  }
}
