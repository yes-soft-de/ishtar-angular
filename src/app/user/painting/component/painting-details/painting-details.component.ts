import { Component, OnInit } from '@angular/core';
import {PaintingService} from '../../service/painting.service';

@Component({
  selector: 'app-painting-details',
  templateUrl: './painting-details.component.html',
  styleUrls: ['./painting-details.component.scss']
})
export class PaintingDetailsComponent implements OnInit {

  constructor(private paintingService: PaintingService) { }

  ngOnInit() {
    this.paintingService.getPainting('1').subscribe(
      paintingDetails => {
        // Consume Data
        console.log(paintingDetails.name);
      }
    );
  }

}
