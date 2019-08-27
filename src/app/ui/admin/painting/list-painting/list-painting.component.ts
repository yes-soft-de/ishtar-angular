import { Component, OnInit } from '@angular/core';
import {PhotosListService} from '../../../../service/PhotosList/photos-list.service';
import {Painting} from '../../../../entity/painting/painting';
import {PaintingInterface} from '../../../../entity/painting/painting-interface';

@Component({
  selector: 'app-list-painting',
  templateUrl: './list-painting.component.html',
  styleUrls: ['./list-painting.component.scss']
})
export class ListPaintingComponent implements OnInit {
  public paintings: Painting;

  constructor(private photosListService: PhotosListService ) { }

  ngOnInit() {
    // Fetch All Paintings
    this.photosListService.getAllPainting().subscribe(
        (res: PaintingInterface) => {
        this.paintings = res;
        console.log(this.paintings);
      }, error1 => {
        console.log(error1);
      });

  }

}
