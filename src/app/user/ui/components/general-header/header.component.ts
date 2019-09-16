import {Component, Input, OnInit} from '@angular/core';
import {ArtTypeListItem} from '../../../entity/art-type-list/art-type-list-item';
import {ArtTypeService} from '../../../../admin/service/art-type/art-type.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
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
