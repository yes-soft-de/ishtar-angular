import {Component, Input, OnInit} from '@angular/core';
import {PaintingDetails} from '../../entity/painting-details';

@Component({
  selector: 'app-painting-knowledge-graph',
  templateUrl: './painting-knowledge-graph.component.html',
  styleUrls: ['./painting-knowledge-graph.component.scss']
})
export class PaintingKnowledgeGraphComponent implements OnInit {
  jsonLdObject: any;

  @Input() painting: PaintingDetails;

  constructor() {
  }

  ngOnInit() {
    this.jsonLdObject = {
      '@context': 'http://schema.org',
      '@type': 'VisualArtwork',
      name: this.painting.name,
      image: this.painting.image,
      description: this.painting.story,
      creator: [
        {
          '@type': 'Person',
          name: this.painting.artist,
          sameAs: 'https://ishtar-art.de/artist/' + this.painting.artistID
        }
      ], width: [
        {
          '@type': 'Distance',
          name: this.painting.width
        }
      ], height: [
        {
          '@type': 'Distance',
          name: this.painting.height
        }
      ],
    };
  }

}
