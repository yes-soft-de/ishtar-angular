import { Component, OnInit } from '@angular/core';
import {PaintingService} from '../../service/painting.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-painting-details',
  templateUrl: './painting-details.component.html',
  styleUrls: ['./painting-details.component.scss']
})
export class PaintingDetailsComponent implements OnInit {

  constructor(private paintingService: PaintingService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.url.subscribe(
      urlSegments => {
        this.paintingService.getPainting(urlSegments[1].path).subscribe(
          paintingDetails => {
            // Consume Data
            console.log(paintingDetails.name);
          }
        );
      }
    );
  }
}
