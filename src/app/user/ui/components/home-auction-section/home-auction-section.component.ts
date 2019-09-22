import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {CarouselComponent} from 'angular-bootstrap-md';

@Component({
  selector: 'app-home-auction-section',
  templateUrl: './home-auction-section.component.html',
  styleUrls: ['./home-auction-section.component.scss']
})
export class HomeAuctionSectionComponent implements OnInit {
  slides = [
    {
      url: '../../../../../assets/square01.jpg',
      title: 'Auction 01',
      details: 'Picasso demonstrated extraordinary artistic talent in his early years,' +
        ' painting in a naturalistic manner through his childhood and adolescence. ' +
        'During the first decade of the 20th century, his style changed as he experimented with different theories,'
    },
    {
      url: '../../../../../assets/logo.png',
      title: 'Auction 02',
      details: 'Picasso demonstrated extraordinary artistic talent in his early years,' +
        ' painting in a naturalistic manner through his childhood and adolescence. ' +
        'During the first decade of the 20th century, his style changed as he experimented with different theories,'
    },
    {
      url: '../../../../../assets/square01.jpg',
      title: 'Auction 03',
      details: 'Picasso demonstrated extraordinary artistic talent in his early years,' +
        ' painting in a naturalistic manner through his childhood and adolescence. ' +
        'During the first decade of the 20th century, his style changed as he experimented with different theories,'
    }
  ];
  activeSlide = 0;
  @ViewChild('auctionSlider', {static: true}) public carousel: CarouselComponent;

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
