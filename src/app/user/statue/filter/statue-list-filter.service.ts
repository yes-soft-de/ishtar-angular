import {Injectable} from '@angular/core';
import {StatueObject} from '../entity/statue-object';

@Injectable({
  providedIn: 'root'
})
export class StatueListFilterService {
  private originalList: StatueObject[] = [];

  // region Filters Keywords, Java Style for Class Members Naming :)
  private mArtistNameFilter: string = null;
  private mMaterialFilter: string = null;
  private mWeightFilter: string = null;
  private mStyleFilter: string = null;

  // endregion

  constructor() {
  }

  public setList(statueList: StatueObject[]) {
    this.originalList = statueList;
  }

  public deactivateAllFilters(): StatueObject[] {
    this.mMaterialFilter = null;
    this.mArtistNameFilter = null;
    this.mWeightFilter = null;
    return this.getFilteredList();
  }

  public activateArtistNameFilter(artistName: string): StatueObject[] {
    this.mArtistNameFilter = artistName;
    return this.getFilteredList();
  }

  public deactivateArtistNameFilter(): StatueObject[] {
    this.mArtistNameFilter = null;
    return this.getFilteredList();
  }

  public activateMaterialFilter(materialName: string): StatueObject[] {
    this.mMaterialFilter = materialName;
    return this.getFilteredList();
  }

  public deactivateMaterialFilter() {
    this.mMaterialFilter = null;
    return this.getFilteredList();
  }

  public activateWeightFilter(size: string): StatueObject[] {
    this.mWeightFilter = size;
    return this.getFilteredList();
  }

  public deactivateWeightFilter(): StatueObject[] {
    this.mWeightFilter = null;
    return this.getFilteredList();
  }

  public activateStyleNameFilter(styleName: string): StatueObject[] {
    this.mStyleFilter = styleName;
    return this.getFilteredList();
  }

  public deactivateStyleNameFilter(): StatueObject[] {
    this.mStyleFilter = null;
    return this.getFilteredList();
  }

  private getFilteredList(): StatueObject[] {
    let resultList = this.originalList;
    if (this.mArtistNameFilter !== null) {
      resultList = this.processArtistNameFilter(resultList);
    }
    if (this.mMaterialFilter !== null) {
      resultList = this.processMaterialFilter(resultList);
    }
    if (this.mWeightFilter !== null) {
      resultList = this.processWeightFilter(resultList);
    }
    if (this.mStyleFilter !== null) {
      resultList = this.processStyleFilter(resultList);
    }
    return resultList;
  }

  private processArtistNameFilter(rowList: StatueObject[]): StatueObject[] {
    const resultList: StatueObject[] = [];
    for (const statue of rowList) {
      if (statue.artist.name === this.mArtistNameFilter) {
        resultList.push(statue);
      }
    }
    return resultList;
  }

  private processMaterialFilter(rowList: StatueObject[]): StatueObject[] {
    const resultList: StatueObject[] = [];
    for (const statue of rowList) {
      if (statue.material === this.mMaterialFilter) {
        resultList.push(statue);
      }
    }
    return resultList;
  }

  private processWeightFilter(rowList: StatueObject[]): StatueObject[] {
    const resultList: StatueObject[] = [];
    for (const statue of rowList) {
      if (statue.weight === this.mWeightFilter) {
        resultList.push(statue);
      }
    }
    return resultList;
  }

  private processStyleFilter(rowList: StatueObject[]): StatueObject[] {
    const resultList: StatueObject[] = [];
    for (const statue of rowList) {
      if (statue.style === this.mStyleFilter) {
        resultList.push(statue);
      }
    }
    return resultList;
  }
}
