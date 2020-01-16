import {Component, Input, OnInit} from '@angular/core';
import {PaintingService} from '../../service/painting.service';
import {PaintingFilterService} from '../../filter/painting-filter.service';
import {PageTypeToNumberService} from '../../../shared/helper/page-type-to-number.service';
import {PaintingListItem} from '../../entity/painting-list-item';

@Component({
  selector: 'app-painting-list',
  templateUrl: './painting-list.component.html',
  styleUrls: ['./painting-list.component.scss']
})
export class PaintingListComponent implements OnInit {


  constructor(private paintingService: PaintingService,
              private filterService: PaintingFilterService) {
  }
  @Input() filter = true;
  public artists: string[];
  public artTypes: string[];
  filterArtType = false;
  filterArtist = false;
  originalList: PaintingListItem[];
  paintingList: PaintingListItem[];
  config: any;
  filterActiveArtist: string = null;
  filterActiveArtType: string = null;

  static shuffle(arra1): Array<any> {
    let ctr = arra1.length;
    let temp;
    let index;

    // While there are elements in the array
    while (ctr > 0) {
      // Pick a random index
      index = Math.floor(Math.random() * ctr);
      // Decrease ctr by 1
      ctr--;
      // And swap the last element with it
      temp = arra1[ctr];
      arra1[ctr] = arra1[index];
      arra1[index] = temp;
    }
    return arra1;
  }

  ngOnInit() {
    this.paintingService.getPaintings().subscribe(
      paintingList => {

        this.originalList = PaintingListComponent.shuffle(paintingList);
        this.paintingList = PaintingListComponent.shuffle(paintingList);
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
    // Dependent on Reaction
    this.paintingService.viewPainting(PageTypeToNumberService.ENTITY_TYPE_PAINTING, paintingId);
  }

  // Fetch All Artists Filters Name
  getArtistNamesList() {
    this.artists = [...new Set(this.paintingList.map(painting => painting.artist))];
  }

  // Fetch All Art Type Filters Name
  getArtTypesList() {
    this.artTypes = [...new Set(this.paintingList.map(painting => painting.artType))];
  }

  private getFilteredList(): PaintingListItem[] {
    let resultList = this.originalList;
    if (this.filterActiveArtist !== null) {
      resultList = this.filterService.processArtistNameFilter(resultList, this.filterActiveArtist);
    }
    if (this.filterActiveArtType !== null) {
      resultList = this.filterService.processArtTypeFilter(resultList, this.filterActiveArtType);
    }
    return resultList;
  }

  // view & hide filter button options
  fiterArtTypeOptionsView() {
    this.filterArtist = false;
    if (this.filterArtType) {
      this.filterArtType = false;
    } else {
      this.filterArtType = true;
    }
  }

  fiterArtistOptionsView() {
    this.filterArtType = false;
    if (this.filterArtist) {
      this.filterArtist = false;
    } else {
      this.filterArtist = true;
    }
  }
}
