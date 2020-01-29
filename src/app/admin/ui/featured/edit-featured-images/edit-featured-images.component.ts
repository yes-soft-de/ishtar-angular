import {Component, OnInit} from '@angular/core';
import {PhotosListService} from '../../../service/PhotosList/photos-list.service';
import {Painting} from '../../../entity/painting/painting';

@Component({
  selector: 'app-edit-featured-images',
  templateUrl: './edit-featured-images.component.html',
  styleUrls: ['./edit-featured-images.component.scss']
})
export class EditFeaturedImagesComponent implements OnInit {
  public paintingList: Painting[];
  public selectedPaintingList: Painting[];

  constructor(private paintingService: PhotosListService) {
  }

  ngOnInit() {
    this.paintingService.getAllPainting().subscribe(
      paintingListResponse => {
        this.paintingList = paintingListResponse.Data;
      }, error1 => {
        console.log(error1);
      }
    );

    this.paintingService.getAllPainting().subscribe(
      paintingListResponse => {
        if (paintingListResponse.Data.length) {
          this.selectedPaintingList = paintingListResponse.Data.slice(0, 8);
        }
      }, error1 => {
        console.log(error1);
      }
    );
  }

}
