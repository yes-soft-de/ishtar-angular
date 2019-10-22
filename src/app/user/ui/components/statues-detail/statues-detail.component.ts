import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-statues-detail',
  templateUrl: './statues-detail.component.html',
  styleUrls: ['./statues-detail.component.scss']
})
export class StatuesDetailComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // Get the element with id="defaultOpen" and click on it
    document.getElementById('defaultOpen').click();
  }

  openTab(evt, cityName) {
    let i;
    let tabContent;
    let tabLinks;
    tabContent = document.getElementsByClassName('tab-content');
    for (i = 0; i < tabContent.length; i++) {
      tabContent[i].style.display = 'none';
    }
    tabLinks = document.getElementsByClassName('tab-links');
    for (i = 0; i < tabLinks.length; i++) {
      tabLinks[i].className = tabLinks[i].className.replace(' active', '');
    }
    document.getElementById(cityName).style.display = 'block';
    evt.currentTarget.className += ' active';
  }



}
