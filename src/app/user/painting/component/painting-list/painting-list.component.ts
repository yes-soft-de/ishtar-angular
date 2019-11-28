import {Component, Input, OnInit} from '@angular/core';
import {PaintingListItem} from '../../../entity/painting-list/painting-list-item';
import {PaintingService} from '../../service/painting.service';
import {PaintingFilterService} from '../../filter/painting-filter.service';
import {PageTypeToNumberService} from '../../../shared/comment/helper/page-type-to-number.service';

@Component({
  selector: 'app-painting-list',
  templateUrl: './painting-list.component.html',
  styleUrls: ['./painting-list.component.scss']
})
export class PaintingListComponent implements OnInit {
  @Input() filter = true;
  public artists: string[];
  public artTypes: string[];
  paintingList: PaintingListItem[];
  config: any;
  filterActiveArtist: string = null;
  filterActiveArtType: string = null;
  filterService: PaintingFilterService = null;

  constructor(private paintingService: PaintingService) {
  }

  ngOnInit() {
    this.paintingService.getPaintings().subscribe(
      paintingList => {
        console.log('NgxPaginationModule', paintingList);
        this.paintingList = paintingList;
        this.filterService = new PaintingFilterService(paintingList);
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
    this.paintingList = this.filterService.activateArtTypeNameFilter(name);
  }

  public disableArtTypeFilter() {
    this.paintingList = this.filterService.deactivateArtTypeNameFilter();
  }

  public filterByArtist(name: string) {
    this.filterActiveArtist = name;
    this.paintingList = this.filterService.activateArtistNameFilter(name);
  }

  public disableArtistNameFilter() {
    this.paintingList = this.filterService.deactivateArtistNameFilter();
  }

  viewImage(paintingId: number) {
    this.paintingService.viewPainting(PageTypeToNumberService.ENTITY_TYPE_PAINTING, paintingId);
  }

  getArtistNamesList() {
    const artists: string[] = [];
    for (const painting of this.paintingList) {
      artists.push(painting.artist);
    }
    this.artists = [...new Set(artists)];
  }

  getArtTypesList() {
    const artTypes: string[] = [];
    for (const painting of this.paintingList) {
      artTypes.push(painting.artType);
    }
    this.artTypes = [...new Set(artTypes)];
  }
}
