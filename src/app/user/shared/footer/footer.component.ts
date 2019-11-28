import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  footerHeight: number;
  constructor() { }

  ngOnInit() {
    // Get Bottom Footer height
    this.footerHeight = document.getElementById('custom-id-bottom-footer').offsetHeight;
  }

}
