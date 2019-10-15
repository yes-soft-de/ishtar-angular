import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {PaintingListService} from '../../../service/painting-list/painting-list.service';
import {PaintingListItem} from '../../../entity/painting-list/painting-list-item';
import {ToastrService} from 'ngx-toastr';
import {PaintingListComponent} from '../../components/painting-list/painting-list.component';

@Component({
  selector: 'app-painting-list',
  templateUrl: './painting-list-page.component.html',
  styleUrls: ['./painting-list-page.component.scss']
})
export class PaintingListPageComponent implements OnInit {
  formattedList: PaintingListItem[];

  constructor(private paintingService: PaintingListService,
              private toaster: ToastrService) {
  }

  ngOnInit() {
    this.fetchData();
  }

  private fetchData() {
    this.paintingService.requestPaintingList().subscribe(
      data => {
        this.formattedList = data.Data;
      }, error1 => {
        this.toaster.error(error1.message);
        console.log(error1);
        // this.fetchData();
      }
    );
  }

}
