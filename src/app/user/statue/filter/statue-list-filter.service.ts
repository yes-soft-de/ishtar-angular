import {Injectable} from '@angular/core';
import {StatueObject} from '../entity/statue-object';

@Injectable({
  providedIn: 'root'
})
export class StatueListFilterService {

  constructor() {
  }

  public processArtistNameFilter(rowList: StatueObject[], artist: string): StatueObject[] {
    const resultList: StatueObject[] = [];
    for (const statue of rowList) {
      if (statue.artist.name === artist) {
        resultList.push(statue);
      }
    }
    return resultList;
  }

  public processMaterialFilter(rowList: StatueObject[], materialName: string): StatueObject[] {
    const resultList: StatueObject[] = [];
    for (const statue of rowList) {
      if (statue.material === materialName) {
        resultList.push(statue);
      }
    }
    return resultList;
  }

  public processWeightFilter(rowList: StatueObject[], weight: string): StatueObject[] {
    const resultList: StatueObject[] = [];
    for (const statue of rowList) {
      if (statue.weight === weight) {
        resultList.push(statue);
      }
    }
    return resultList;
  }

  public processStyleFilter(rowList: StatueObject[], style: string): StatueObject[] {
    const resultList: StatueObject[] = [];
    for (const statue of rowList) {
      if (statue.style === style) {
        resultList.push(statue);
      }
    }
    return resultList;
  }
}
