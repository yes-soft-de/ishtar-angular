import { Component, OnInit } from '@angular/core';
import {ArtTypeResponse} from '../../../../admin/entity/art-type/art-type-response';
import {AdminConfig} from '../../../../admin/AdminConfig';
import {catchError} from 'rxjs/operators';
import {ArtTypeListItem} from '../../../entity/art-type-list/art-type-list-item';
import {ArtTypeService} from '../../../../admin/service/art-type/art-type.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-home-header',
  templateUrl: './home-header.component.html',
  styleUrls: ['./home-header.component.scss']
})
export class HomeHeaderComponent implements OnInit {
  public paintings = [];
  artTypeList: ArtTypeListItem[];
  constructor(private artTpeService: ArtTypeService) { }

  ngOnInit() {
    this.artTpeService.getAllArtType().subscribe(
      data => {
        this.artTypeList = data.Data;
      }
    );
    const painting = {
      url: 'https://s3-ap-southeast-2.amazonaws.com/ish-oncourse-scc/b5cd4cfb-c5d9-4147-a72b-452d2f04bb73',
      head: 'History Of Syrian Art',
      description: 'History Of Syrian Art History Of Syrian Art History Of Syrian Art'
    };

    this.paintings.push(painting, painting, painting);
  }

}
