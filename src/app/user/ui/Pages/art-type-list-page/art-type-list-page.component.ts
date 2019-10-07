import { Component, OnInit } from '@angular/core';
import {ArtTypeListItem} from '../../../entity/art-type-list/art-type-list-item';
import {ArtTypeService} from '../../../../admin/service/art-type/art-type.service';

@Component({
  selector: 'app-art-type-list-page',
  templateUrl: './art-type-list-page.component.html',
  styleUrls: ['./art-type-list-page.component.scss']
})
export class ArtTypeListPageComponent implements OnInit {
  artTypeList: ArtTypeListItem[];
  constructor(private artTpeService: ArtTypeService) { }

  ngOnInit() {
    this.artTpeService.getAllArtType().subscribe(
      data => {
        this.artTypeList = data.Data;
      }
    );
  }

}
