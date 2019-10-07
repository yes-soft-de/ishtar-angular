import {Component, Input, OnInit} from '@angular/core';
import {ArtTypeService} from '../../../../admin/service/art-type/art-type.service';
import {ArtTypeListItem} from '../../../entity/art-type-list/art-type-list-item';

@Component({
  selector: 'app-item-brief',
  templateUrl: './item-brief.component.html',
  styleUrls: ['./item-brief.component.scss']
})
export class ItemBriefComponent implements OnInit {

  @Input() artType;

  constructor() {
  }

  ngOnInit() {
  }

}
