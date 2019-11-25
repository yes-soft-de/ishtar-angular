import {Component, OnInit} from '@angular/core';
import {PaintingService} from '../../../service/painting/painting.service';
import {PaintingListItem} from '../../../entity/painting-list/painting-list-item';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-painting-list',
  templateUrl: './painting-list-page.component.html',
  styleUrls: ['./painting-list-page.component.scss']
})
export class PaintingListPageComponent implements OnInit {
  formattedList: PaintingListItem[];

  constructor(private paintingService: PaintingService) {
  }

  ngOnInit() {
    this.fetchData();
  }

  private fetchData() {
    this.paintingService.requestPaintingList().subscribe(
      data => {
        this.formattedList = data.Data;
      }, error1 => {
        console.log(error1);
      }
    );
  }

}
