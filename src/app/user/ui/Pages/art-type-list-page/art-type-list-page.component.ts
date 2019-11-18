import { Component, OnInit } from '@angular/core';
import {ArtTypeManagerService} from '../../../manager/art-type/art-type-manager.service';
import {ArtTypeObject} from '../../../entity-protected/art-type/art-type-object';

@Component({
  selector: 'app-art-type-list-page',
  templateUrl: './art-type-list-page.component.html',
  styleUrls: ['./art-type-list-page.component.scss']
})
export class ArtTypeListPageComponent implements OnInit {
  artTypeList: ArtTypeObject[];
  constructor(private artTypeService: ArtTypeManagerService) { }

  ngOnInit() {
    this.artTypeService.getListObservable().subscribe(
      data => {
        this.artTypeList = data;
      }
    );
    this.artTypeService.getAllArtTypes();
  }

}
