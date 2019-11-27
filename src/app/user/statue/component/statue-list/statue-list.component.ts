import {Component, OnInit} from '@angular/core';
import {document} from 'ngx-bootstrap';
import {StatueService} from '../../service/statue.service';
import {StatueObject} from '../../entity/statue-object';

@Component({
  selector: 'app-statue-list',
  templateUrl: './statue-list.component.html',
  styleUrls: ['./statue-list.component.scss']
})
export class StatueListComponent implements OnInit {
  magnifyingImage = false;
  statueList: StatueObject[] = null;
  constructor(private statueService: StatueService) {
  }

  ngOnInit() {
    this.statueService.getStatueList().subscribe(
      statueList => {
        this.statueList = statueList;
      }
    );
  }

  // Increase view for Statue
  viewStatue(statueId: number) {
    // this.interactionService.addViewInteraction(statueId, 'statue');
  }

  noFilter() {
    // this.statuesListFiltered = this.statuesList;
  }

  filterName(event) {
    // const BTN_NAME = event.target.name;
    // this.statuesListFiltered = [];
    // for (let i = 0; i < this.statuesList.length; i++) {
    //   if (BTN_NAME === this.statuesList[i].name) {
    //     this.statuesListFiltered[i] = this.statuesList[i];
    //   }
    // }
  }

  filterArtistName(event) {
    // const BTN_NAME = event.target.name;
    // this.statuesListFiltered = [];
    // for (let i = 0; i < this.statuesList.length; i++) {
    //   if (BTN_NAME === this.statuesList[i].artist.name) {
    //     this.statuesListFiltered[i] = this.statuesList[i];
    //   }
    // }
  }

  filterMaterial(event) {
    // const BTN_NAME = event.target.name;
    // this.statuesListFiltered = [];
    // for (let i = 0; i < this.statuesList.length; i++) {
    //   if (BTN_NAME === this.statuesList[i].material) {
    //     this.statuesListFiltered[i] = this.statuesList[i];
    //   }
    // }
  }

  filterSmallSize() {
    // this.statuesListFiltered = [];
    // for (let i = 0; i < this.statuesList.length; i++) {
    //   if ((this.statuesList[i].width <= 2.54) && (this.statuesList[i].height <= 1.27)) {
    //     this.statuesListFiltered[i] = this.statuesList[i];
    //   }
    // }
  }

  filterMediumSize() {
    // this.statuesListFiltered = [];
    // for (let i = 0; i < this.statuesList.length; i++) {
    //   if ((this.statuesList[i].width > 2.54) &&
    //     (this.statuesList[i].width <= 3.81) &&
    //     (this.statuesList[i].height > 1.27) &&
    //     (this.statuesList[i].height <= 2.54)) {
    //     this.statuesListFiltered[i] = this.statuesList[i];
    //   }
    // }
  }

  filterBigSize() {
    // this.statuesListFiltered = [];
    // for (let i = 0; i < this.statuesList.length; i++) {
    //   if ((this.statuesList[i].width > 3.81) && (this.statuesList[i].height > 2.54)) {
    //     this.statuesListFiltered[i] = this.statuesList[i];
    //   }
    // }
  }

  MagnifyingImage(event) {
    // const BTN_NUMBER = event.target.name;
    // const INFO_ID: string = 'info_' + BTN_NUMBER;
    // console.log(BTN_NUMBER);
    // if (this.magnifyingImage) {
    //   document.getElementById(INFO_ID).style.display = 'block';
    //   this.magnifyingImage = false;
    // } else {
    //   document.getElementById(INFO_ID).style.display = 'none';
    //   this.magnifyingImage = true;
    // }
  }

  openList(event) {
    // if(window.innerWidth < 768) {
    //   if(event.target.parentElement.classList.contains('active')){
    //     event.target.parentElement.classList.remove('active');
    //   } else {
    //     var title = document.getElementsByClassName('title');
    //     for(var i=0; i < title.length; i++){
    //       title[i].parentElement.classList.remove('active');
    //     }
    //     event.target.parentElement.classList.add('active');
    //   }
    // }
  }
}
