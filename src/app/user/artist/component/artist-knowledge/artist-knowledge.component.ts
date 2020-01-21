import {Component, Input, OnInit} from '@angular/core';
import {ArtistDetails} from '../../entity/artist-details';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';

@Component({
  selector: 'app-artist-knowledge',
  templateUrl: './artist-knowledge.component.html',
  styleUrls: ['./artist-knowledge.component.scss']
})
export class ArtistKnowledgeComponent implements OnInit {
  @Input() artist: ArtistDetails;
  jsonLD: SafeHtml;

  linkedInRegex = new RegExp('http(s)?:\\/\\/([w]{3}\\.)?linkedin\\.com\\/in\\/([a-zA-Z0-9-]{5,30})\\/?');

  // tslint:disable-next-line:max-line-length
  facebookRegex = new RegExp('(?:(?:http|https):\\/\\/)?(?:www.)?facebook.com\\/(?:(?:\\w)*#!\\/)?(?:pages\\/)?(?:[?\\w\\-]*\\/)?(?:profile.php\\?id=(?=\\d.*))?([\\w\\-]*)?');

  // tslint:disable-next-line:max-line-length
  twitterRegex = new RegExp('(?:(?:http|https):\\/\\/)?(?:www.)?twitter.com\\/(?:(?:\\w)*#!\\/)?(?:pages\\/)?(?:[?\\w\\-]*\\/)?(?:profile.php\\?id=(?=\\d.*))?([\\w\\-]*)?');

  constructor(private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    const json = {
      '@context': 'http://www.schema.org',
      '@type': 'Person',
      '@id': 'https://ishtar-art.de/' + this.artist.id,
      name: this.artist.name,
      nationality: 'Syrian',
      birthPlace: {
        '@type': 'Place',
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'Syria'
        }
      },
      Description: 'Artist',
      jobTitle: 'Artist',
      worksFor: [
        {
          '@type': 'Organization',
          name: 'Skunkworks Creative Group Inc.',
          sameAs: [
            this.facebookRegex.test(this.artist.Facebook) ? this.artist.Facebook : null,
            this.twitterRegex.test(this.artist.Twitter) ? this.artist.Twitter : null,
            this.linkedInRegex.test(this.artist.Linkedin) ? this.artist.Linkedin : null,
          ]
        }
      ],
      image: this.artist.path
    };

    this.jsonLD = this.getSafeHTML(json);
  }

  getSafeHTML(value: {}) {
    // If value convert to JSON and escape / to prevent script tag in JSON
    const json = value
      ? JSON.stringify(value, null, 2).replace(/\//g, '\\/')
      : '';
    const html = `${json}`;
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
