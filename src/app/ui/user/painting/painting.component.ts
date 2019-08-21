import {Component, OnInit} from '@angular/core';
import {NetworkConnectorService} from '../../../service/NetworkConnectorService/network-connector.service';
import {Painting} from '../../../entity/user/painting/painting';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-painting',
  templateUrl: './painting.component.html',
  styleUrls: ['./painting.component.scss']
})
export class PaintingComponent implements OnInit {
  private mPainting: Painting;

  constructor(private networkConnector: NetworkConnectorService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.networkConnector.requestPaintingDetails(
      this.activatedRoute.snapshot.paramMap.get('id')
    ).subscribe(
      data => {
        this.mPainting = data;
      }, error1 => {
        console.log(error1);
      }
    );
  }

}
