import { Component, OnInit } from '@angular/core';
import { PhotosListService } from '../../../service/PhotosList/photos-list.service';
import { Painting } from '../../../entity/painting/painting';
import { FeaturedPaintingsService } from '../../../service/featured/featured-paintings.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-featured-images',
  templateUrl: './edit-featured-images.component.html',
  styleUrls: ['./edit-featured-images.component.scss']
})
export class EditFeaturedImagesComponent implements OnInit {
  public featuredList: Painting[];

  public originalList: Painting[];
  public filteredList: Painting[];

  searchForm = new FormGroup({
    query: new FormControl('')
  });

  constructor(private paintingService: PhotosListService,
              private featuredService: FeaturedPaintingsService,
              private toaster: ToastrService) {
  }

  ngOnInit() {
    this.getAllPaintings();
    this.getFeaturedPaintings();
  }

  selectPainting(painting: Painting) {
    console.log('Selecting a Painting');
    this.featuredService.selectFeaturedPainting(painting.id).subscribe(
      () => {
        this.toaster.success(`${painting.name} is Selected`);
        this.getFeaturedPaintings();
      }, error1 => {
        this.toaster.error(`Error Selecting Painting: ${painting.name}`);
        console.error(error1);
      }
    );
  }

  unselectPainting(painting: Painting) {
    console.log('Removing a Painting');
    this.featuredService.removeFeaturedPainting(painting.id).subscribe(
      () => {
        this.toaster.success(`${painting.name} is Removed From the List`);
        this.getFeaturedPaintings();
      }, error1 => {
        this.toaster.error(`Error Selecting Painting: ${painting.name}`);
        console.error(error1);
      }
    );
  }

  getAllPaintings() {
    this.paintingService.getAllPainting().subscribe(
      paintingListResponse => {
        this.originalList = paintingListResponse.Data;
        this.filterByName();
      }, error1 => {
        console.log(error1);
      }
    );
  }

  getFeaturedPaintings() {
    this.featuredService.getFeaturedPaintings().subscribe(
      paintingListResponse => {
        if (paintingListResponse.Data.length) {
          this.featuredList = paintingListResponse.Data;
          this.filterByName();
        }
      }, error1 => {
        console.log(error1);
      }
    );
  }

  filterByName() {
    this.filteredList = this.originalList.filter(a => {
      console.log(`filtering on ${this.searchForm.get('query').value}`);
      return a.name.toLowerCase().includes(`${this.searchForm.get('query').value.toLowerCase()}`);
    });
  }
}
