import {Component, Input, OnInit} from '@angular/core';
import {ArtTypeService} from '../../service/art-type.service';
import {ArtTypeListItem} from '../../entity/art-type-list-item';

@Component({
  selector: 'app-art-type-list',
  templateUrl: './art-type-list.component.html',
  styleUrls: ['./art-type-list.component.scss']
})
export class ArtTypeListComponent implements OnInit {
  artTypeList: ArtTypeListItem[];

  // 100 is just too large number, this should show all...
  @Input() viewedArtTypesLimit = 100;

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

  constructor(private artTypeService: ArtTypeService) {
  }

  ngOnInit() {
    this.artTypeService.getArtTypeList().subscribe(
      artTypes => {
        this.artTypeList = ArtTypeListComponent.shuffle(artTypes);
      }
    );
  }

}
