import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ArtTypeDetails} from '../../../entity/art-type-details/art-type-details';
import {PaintingListItem} from '../../../entity/painting-list/painting-list-item';
import {CarouselComponent} from 'angular-bootstrap-md';
import {FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';

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

  searchFrom = new FormGroup({
    search: new FormControl('')
  });

  constructor(private router: Router) {
    // console.log(this.paintings.length);
  }

  ngOnInit() {
  }

  setActiveSlide(activeSlideNumber) {
    this.carousel.activeSlide = activeSlideNumber;
    this.activeSlide = activeSlideNumber;
  }

  slideChanged(event) {
    // console.log(event.relatedTarget);
    this.activeSlide = event.relatedTarget;
  }

  submitSearch() {
    this.router.navigate(['/search/' + this.searchFrom.get('search').value]);
  }
}
