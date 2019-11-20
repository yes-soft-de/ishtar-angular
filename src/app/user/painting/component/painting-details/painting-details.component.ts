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
        console.log(urlSegments['0'].path, urlSegments['1'].path);
        this.paintingService.getPaintingArtistData(Number(urlSegments[1].path)).subscribe(
            data => {
              console.log(data);
            }
        );
      }
    );
  }


  setMainPainting(event) {
    const target = event.target || event.srcElement || event.currentTarget;
    const paintingSrc = target.attributes.src;
    const value = paintingSrc.nodeValue;
    const mainImage = document.getElementById('main-img');
    mainImage.setAttribute('src', value);
    document.getElementById('full-size-img').setAttribute('src', value);
  }

  showImageInFullSize() {
    document.getElementById('full-size-img').classList.add('active');
  }

  hideFullScreenMode() {
    document.getElementById('full-size-img').classList.remove('active');
  }

  // Navigate To Next Painting
  goNext() {
    return;
  }


  // Navigate To Previous Painting
  goBack() {
    return;
  }



}
