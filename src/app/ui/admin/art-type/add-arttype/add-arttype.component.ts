import { Component, OnInit } from '@angular/core';
import {ArtType} from '../../../../entity/art-type/art-type';
import {ArtTypeService} from '../../../../service/art-type/art-type.service';

@Component({
  selector: 'app-add-arttype',
  templateUrl: './add-arttype.component.html',
  styleUrls: ['./add-arttype.component.scss']
})
export class AddArttypeComponent implements OnInit {

  constructor(private artTypeService: ArtTypeService) { }

  ngOnInit() {
  }

  artTypeSubmit(form) {
    // create const variable to store our art type instance
    const  artType: ArtType = new ArtType();
    artType.name = form.value.name;
    artType.history = form.value.history;
    artType.story = form.value.story;
    artType.image = form.value.image;
    artType.video = form.value.video;
    // insert our object in http post request
    this.artTypeService.postAddArtType(artType);
    // TODO insert ngx-toastr Message
  }

}
