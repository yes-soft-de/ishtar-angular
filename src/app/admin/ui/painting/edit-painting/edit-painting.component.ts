import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {PhotosListService} from '../../../service/PhotosList/photos-list.service';
import {PaintingInterface} from '../../../entity/painting/painting-interface';


@Component({
  selector: 'app-edit-painting',
  templateUrl: './edit-painting.component.html',
  styleUrls: ['./edit-painting.component.scss']
})
export class EditPaintingComponent implements OnInit {
  paintingID: number;
  paintingData = {
    name: '',
    artist: '',
    artType: '',
    addingDate: '',
    deminsions: '',
    state: '',
    colorsType: '',
    price: '',
    story: ''
  };

  constructor(private router: Router,
              private route: ActivatedRoute,
              private photosListService: PhotosListService ) { }

  ngOnInit() {
    // Fetch The painting ID
    this.route.paramMap.subscribe((param: ParamMap) => {
      this.paintingID = Number(param.get('id'));
    });
    // Fetch The painting Data Depends On His ID
    this.photosListService.getPaintingInfo(this.paintingID).subscribe(
        data => {
          if (data) {
            this.paintingData.name = data.name;
            this.paintingData.artist = `${data.artist}`;
            this.paintingData.artType = `${data.artType}`;
            this.paintingData.addingDate = data.addingDate;
            this.paintingData.deminsions = data.deminsions;
            this.paintingData.state = `${data.state}`;
            this.paintingData.colorsType = data.colorsType;
            this.paintingData.price = `${data.price}`;
            this.paintingData.story = data.story;
            console.log(this.paintingData);
          }
        },
        error => {
          console.log(error);
        }
    );
  }

  // Save THe Data After Update It
  myEditSubmit(form) {
    this.photosListService.updatePainting(this.paintingID, form.value).subscribe(
        (data: PaintingInterface) => {
          console.log('request successfully', data);
        },
        error => {
          console.log(error);
        },
        () => {
          this.router.navigate(['admin/list-paintings']);
        }
    );
  }
}
