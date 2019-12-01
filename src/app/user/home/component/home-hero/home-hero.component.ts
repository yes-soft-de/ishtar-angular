import {Component, OnInit, ViewChild} from '@angular/core';
import {CarouselComponent} from 'angular-bootstrap-md';

@Component({
  selector: 'app-home-hero',
  templateUrl: './home-hero.component.html',
  styleUrls: ['./home-hero.component.scss']
})
export class HomeHeroComponent implements OnInit {
  activeSlide = 0;
  @ViewChild('heroSlider', {static: true}) public carousel: CarouselComponent;
  public paintings = [{
    url: '../../../../../assets/hero-slide.jpg',
    title: 'The beauty in its best form',
    text: ' '
  },
    {
      url: '../../../../../assets/hero-slide.jpg',
      title: 'From the best Syrian Artists',
      text: ' '
    },
    {
      url: '../../../../../assets/hero-slide.jpg',
      title: 'We present to you some masterpieces of art',
      text: ' '
    }];

  constructor() {
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
