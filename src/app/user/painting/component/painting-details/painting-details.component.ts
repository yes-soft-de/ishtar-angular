import {Component, OnInit} from '@angular/core';
import {PaintingService} from '../../service/painting.service';
import {ActivatedRoute} from '@angular/router';
import {PaintingDetails} from '../../../entity/painting-details/painting-details';

@Component({
  selector: 'app-painting-details',
  templateUrl: './painting-details.component.html',
  styleUrls: ['./painting-details.component.scss']
})
export class PaintingDetailsComponent implements OnInit {
  private painting: PaintingDetails;

  constructor(private paintingService: PaintingService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.url.subscribe(
      urlSegments => {
        this.paintingService.getPainting(urlSegments[1].path).subscribe(
          paintingDetails => {
            // Consume Data
            this.painting = paintingDetails;
          }
        );
      }
    );
  }

}
