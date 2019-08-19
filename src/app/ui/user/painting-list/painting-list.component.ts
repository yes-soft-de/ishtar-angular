import {Component, OnInit} from '@angular/core';
import {concat} from 'rxjs';
import {PhotosListService} from '../../../service/PhotosList/photos-list.service';

@Component({
  selector: 'app-painting-list',
  templateUrl: './painting-list.component.html',
  styleUrls: ['./painting-list.component.scss']
})
export class PaintingListComponent implements OnInit {
  private photos;

  constructor(private photosService: PhotosListService) {
  }

  ngOnInit() {
    this.photosService.getPhotosList().subscribe(
      data => {
        this.photos = data.data;
        console.log(data.data);
      }
    );
  }

}
