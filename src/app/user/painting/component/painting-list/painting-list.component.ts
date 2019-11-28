import {Component, Input, OnInit} from '@angular/core';
import {PaintingListItem} from '../../../entity/painting-list/painting-list-item';
import {PaintingService} from '../../service/painting.service';
import {PaintingFilterService} from '../../filter/painting-filter.service';

@Component({
  selector: 'app-painting-list',
  templateUrl: './painting-list.component.html',
  styleUrls: ['./painting-list.component.scss']
})
export class PaintingListComponent implements OnInit {
  public artists: string[];
  public artTypes: string[];
  paintingList: PaintingListItem[];
  @Input() filter = true;

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
        this.paintingList = paintingList;
        this.filterService.setList(paintingList);
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
