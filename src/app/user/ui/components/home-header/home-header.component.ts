import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-header',
  templateUrl: './home-header.component.html',
  styleUrls: ['./home-header.component.scss']
})
export class HomeHeaderComponent implements OnInit {
  public paintings = [];
  constructor() { }

  ngOnInit() {

    const painting = {
      url: 'https://s3-ap-southeast-2.amazonaws.com/ish-oncourse-scc/b5cd4cfb-c5d9-4147-a72b-452d2f04bb73',
      head: 'History Of Syrian Art',
      description: 'History Of Syrian Art History Of Syrian Art History Of Syrian Art'
    };

    this.paintings.push(painting, painting, painting);
  }

}
