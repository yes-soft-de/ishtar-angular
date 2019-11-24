import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {PaintingService} from '../../service/painting.service';
import {ActivatedRoute} from '@angular/router';
import {ArtistService} from '../../../artist/service/artist.service';
import {ArtistDetails} from '../../../artist/entity/artist-details';
import {PaintingDetails} from '../../entity/painting-details';

@Component({
  selector: 'app-painting-details',
  templateUrl: './painting-details.component.html',
  styleUrls: ['./painting-details.component.scss']
})
export class PaintingDetailsComponent implements OnInit {
  @ViewChild('mainImg', {read: ElementRef, static: true}) mainImg: ElementRef;
  @ViewChild('fullSizeImg', {read: ElementRef, static: true}) fullSizeImg: ElementRef;
  painting: PaintingDetails;
  artist: ArtistDetails;
  secondaryPaintings: {secondImage: string}[] = [];
  fullImage = false;

  constructor(private paintingService: PaintingService,
              private artistService: ArtistService,
              private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.url.subscribe(
      urlSegments => {
        this.paintingService.getPainting(Number(urlSegments[1].path)).subscribe(
            data => {
              this.painting = data;
              // Loop To Catch The Secondary Images For This Painting
              for (let num = 2; num < 6; num++) {
                if (this.painting[num]) {
                  this.secondaryPaintings.push({
                    secondImage: this.painting[num].image
                  });
                }
              }
              // Fetch Artist For This Painting
              this.artistService.getArtist(this.painting['0'].artistId).subscribe(
                  res => {
                    this.artist = res;
                    console.log('Artist Detail : ', this.artist);
                  }
              );
              console.log('Painting Detail: ', this.painting);
            }
        );
      }
    );
  }

  setMainPainting(event) {
    // Get THe Current Target Element
    const target = event.target || event.srcElement || event.currentTarget;
    // Get THe Current Target Src
    const paintingSrc = target.attributes.src;
    const value = paintingSrc.nodeValue;          // Get src attribute for Current Element
    this.mainImg.nativeElement.src = value;       // Set The src attribute value to MainImage
    this.fullSizeImg.nativeElement.src = value;   // Set The src attribute value to FullSizeImage
  }

  showImageInFullSize() {
    this.fullImage = true;  // Display Painting In Full Size
  }

  hideFullScreenMode() {
    this.fullImage = false;   // Exit From Painting Full Size
  }

}
