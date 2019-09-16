import {Component, HostListener, OnInit} from '@angular/core';
import {ArtTypeService} from '../../../../admin/service/art-type/art-type.service';
import {ArtTypeListItem} from '../../../entity/art-type-list/art-type-list-item';
import {PaintingListService} from '../../../service/painting-list/painting-list.service';
import {PaintingListItem} from '../../../entity/painting-list/painting-list-item';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  position = 0;
  direction = 'down';
  artTypeList: ArtTypeListItem[];
  public headerSlides = [];
  public paintingList: PaintingListItem[];
  showNavbar = false;

  constructor(private artTpeService: ArtTypeService, private paintingService: PaintingListService) {
  }

  ngOnInit() {
    this.initPaintingList();
    this.artTpeService.getAllArtType().subscribe(
      data => {
        this.artTypeList = data.Data;
      }
    );

    this.paintingService.requestPaintingList().subscribe(
      data => {
        this.paintingList = [];
        for (const i of data.Data) {
          this.paintingList.push(i);
        }
      }
    );
  }

  initPaintingList() {
    const painting = {
      url: 'https://s3-ap-southeast-2.amazonaws.com/ish-oncourse-scc/b5cd4cfb-c5d9-4147-a72b-452d2f04bb73',
    };

    this.headerSlides.push(painting, painting, painting);
  }

  // region Direction Calculator
  @HostListener('window:scroll', [])
  doSomething() {
    if (window.pageYOffset < 360) {
      this.showNavbar = false;
      return;
    }
    // Get the Past Location and direction
    const past = this.position;
    const oldDir = this.direction;
    // Get the new Location
    const current = window.pageYOffset;
    // Calc the difference
    const delta = current - past;
    if (Math.abs(delta) < 20) {
      // discard
      this.position = window.pageYOffset;
      return;
    }
    // So there is a movement
    if (delta > 0 && oldDir !== 'Down') {
      this.direction = 'Down';
      console.log(this.direction);
      this.showNavbar = false;
    } else if (delta < 0 && oldDir !== 'Up') {
      this.direction = 'Up';
      console.log(this.direction + ' delta ' + delta);
      this.showNavbar = true;
    }
    // Save Data For Future Calculations
    this.position = window.pageYOffset;
  }
}
