import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ArtTypeDetails} from '../../../entity/art-type-details/art-type-details';
import {CarouselComponent} from 'angular-bootstrap-md';

@Component({
  selector: 'app-home-header',
  templateUrl: './home-header.component.html',
  styleUrls: ['./home-header.component.scss']
})
export class HomeHeaderComponent implements OnInit {
  @Input() public paintings: any[] = [];
  @Input() artTypeList: ArtTypeDetails[];
  activeSlide = 0;
  @ViewChild('heroSlider', {static: true}) public carousel: CarouselComponent;
  constructor() {
    // console.log(this.paintings.length);
  }

  ngOnInit() {
  }

  setActiveSlide(activeSlideNumber) {
    this.carousel.activeSlide = activeSlideNumber;
    this.activeSlide = activeSlideNumber;
  }

  slideChanged(event) {
    this.activeSlide = event.relatedTarget;
  }
}
