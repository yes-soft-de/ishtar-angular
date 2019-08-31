import { Component, OnInit } from '@angular/core';
import {PhotosListService} from '../../../service/PhotosList/photos-list.service';
import {Painting} from '../../../entity/painting/painting';


@Component({
  selector: 'app-add-painting',
  templateUrl: './add-painting.component.html',
  styleUrls: ['./add-painting.component.scss']
})
export class AddPaintingComponent implements OnInit {

  constructor(private photosListService: PhotosListService) { }

  ngOnInit() {
  }

  mySubmit(form) {
    const painting: Painting = new Painting();
    // TODO inserting new real data
    painting.name = form.value.name;
    // painting.image = form.value.image;
    painting.artist = form.value.artist;
    painting.artType = form.value.artType;
    painting.deminsions = form.value.deminsions;
    painting.addingDate = form.value.addingDate;
    painting.state = form.value.state;
    painting.colorsType = form.value.colorsType;
    painting.price = form.value.price;
    painting.story = form.value.story;
    this.photosListService.postAddPainting(painting);
    // TODO insert ngx-toastr Message
  }

}
