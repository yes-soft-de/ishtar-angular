import {Component, OnInit} from '@angular/core';
import {PaintingListService} from '../../../service/painting-list/painting-list.service';
import {ImageListService} from '../../../service/images-list/image-list.service';
import {PaintingListAdapter} from '../../../bussiness-logic/painting-list-adapter/painting-list-adapter';
import {PaintingListItem} from '../../../entity/painting-list/painting-list-item';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-painting-list',
  templateUrl: './painting-list-page.component.html',
  styleUrls: ['./painting-list-page.component.scss']
})
export class PaintingListPageComponent implements OnInit {
  formattedList: PaintingListItem[];
  constructor(private paintingService: PaintingListService, private toaster: ToastrService) {
  }

  ngOnInit() {
    this.paintingService.requestPaintingList().subscribe(
      data => {
        this.formattedList = data.data;
      }, error1 => {
        this.toaster.error(JSON.stringify(error1));
      }
    );
  }

}
