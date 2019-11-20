import {Component, OnInit} from '@angular/core';
import {PaintingService} from '../../service/painting.service';
import {ActivatedRoute} from '@angular/router';
import {PaintingDetails} from '../../../entity/painting-details/painting-details';
import {ArtistService} from '../../../artist/service/artist.service';
import {ArtistDetails} from '../../../artist/entity/artist-details';

@Component({
  selector: 'app-painting-details',
  templateUrl: './painting-details.component.html',
  styleUrls: ['./painting-details.component.scss']
})
export class PaintingDetailsComponent implements OnInit {
  private painting: PaintingDetails;
  private artist: ArtistDetails;

  constructor(private paintingService: PaintingService,
              private artistService: ArtistService,
              private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.url.subscribe(
      urlSegments => {
        console.log(urlSegments['0'].path, urlSegments['1'].path);
        this.paintingService.getPaintingArtistData(Number(urlSegments[1].path)).subscribe(
          (data: any) => {
            this.painting = data[1].Data; // Storing Painting Details Data
            data[2].Data.map(res => {     // Storing Artist Data For This Painting
              if (res.name === this.painting['0'].artist) {
                this.artist = res;
              }
            });
            console.log('paiting', this.painting, 'artist', this.artist);
          }
        );
      }
    );
  }


  setMainPainting(event) {
    const target = event.target || event.srcElement || event.currentTarget;
    const paintingSrc = target.attributes.src;
    const value = paintingSrc.nodeValue;
    const mainImage = document.getElementById('main-img');
    mainImage.setAttribute('src', value);
    document.getElementById('full-size-img').setAttribute('src', value);
  }

  showImageInFullSize() {
    document.getElementById('full-size-img').classList.add('active');
  }

  hideFullScreenMode() {
    document.getElementById('full-size-img').classList.remove('active');
  }

  // Navigate To Next Painting
  goNext() {
    return;
  }


  // Navigate To Previous Painting
  goBack() {
    return;
  }



}
