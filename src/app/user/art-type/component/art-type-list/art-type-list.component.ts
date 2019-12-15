import {Component, OnInit} from '@angular/core';
import {ArtTypeService} from '../../service/art-type.service';
import {ArtTypeListItem} from '../../entity/art-type-list-item';

@Component({
  selector: 'app-art-type-list',
  templateUrl: './art-type-list.component.html',
  styleUrls: ['./art-type-list.component.scss']
})
export class ArtTypeListComponent implements OnInit {
  artTypeList: ArtTypeListItem[];

  constructor(private artTypeService: ArtTypeService) {
  }

  ngOnInit() {
    this.artTypeService.getArtTypeList().subscribe(
      artTypes => {
        this.artTypeList = artTypes;
      }
    );
  }

}
