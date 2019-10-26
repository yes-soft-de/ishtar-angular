import {Component, Input, OnInit} from '@angular/core';

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
