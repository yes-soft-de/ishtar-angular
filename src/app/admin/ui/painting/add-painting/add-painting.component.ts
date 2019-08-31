import {Component, OnInit} from '@angular/core';
import {PhotosListService} from '../../../service/PhotosList/photos-list.service';
import {Painting} from '../../../entity/painting/painting';
import {ArtistService} from '../../../service/artist/artist.service';
import {Artist} from '../../../entity/artist/artist';
import {ArtTypeService} from '../../../service/art-type/art-type.service';
import {ArtType} from '../../../entity/art-type/art-type';


@Component({
  selector: 'app-add-painting',
  templateUrl: './add-painting.component.html',
  styleUrls: ['./add-painting.component.scss']
})
export class AddPaintingComponent implements OnInit {
  artistList: Artist[];
  artTypeList: ArtType[];

  constructor(private photosListService: PhotosListService, private artistService: ArtistService, private artTypeService: ArtTypeService) {
  }

  ngOnInit() {
    this.artistService.getAllArtists().subscribe(data => {
        this.artistList = data.Data;
    }, error1 => {
      console.log(error1);
    });

    this.artTypeService.getAllArtType().subscribe(
      data => {
        this.artTypeList = data.Data;
      }
    );
  }

  mySubmit(form) {
    const painting: Painting = new Painting();
    // TODO inserting new real data
    painting.name = form.value.name;
    // painting.image = form.value.image;
    painting.artist = form.value.artist;
    painting.artType = form.value.artType.id;
    painting.deminsions = form.value.deminsions;
    painting.addingDate = form.value.addingDate;
    painting.state = form.value.state;
    painting.colorsType = form.value.colorsType;
    painting.price = form.value.price;
    painting.story = form.value.story;
    painting.imageUrl = form.value.url;
    this.photosListService.postAddPainting(painting);
    // TODO insert ngx-toastr Message
  }

}
