import {Component, OnDestroy, OnInit} from '@angular/core';
import {PhotosListService} from '../../../service/PhotosList/photos-list.service';
import {PaintingInterface} from '../../../entity/painting/painting-interface';
import {Subscription} from 'rxjs';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-list-painting',
  templateUrl: './list-painting.component.html',
  styleUrls: ['./list-painting.component.scss']
})
export class ListPaintingComponent implements OnInit, OnDestroy {
  public paintings: PaintingInterface[];
  allPaintingObservable: Subscription;
  paintingsList: PaintingInterface[] = [];
  paintingsFilterList = [];     // We Create It Second For Filter
  config: any;                  // Config Variable For Pagination Configuration
  name: string;                 // name variable to store the input search value

  constructor(private toaster: ToastrService,
              private photosListService: PhotosListService ) { }

  ngOnInit() {
    this.getPaintings();
  }

  ngOnDestroy() {
    this.allPaintingObservable.unsubscribe();
  }

  getPaintings() {
    // Fetch All Paintings
    this.allPaintingObservable = this.photosListService.getAllPainting().subscribe(
      (res: any) => {
        this.paintings = res.Data;
        this.paintingsList = [];
        for (const painting of this.paintings) {
          this.paintingsList.push({
            id: painting.id,
            name: painting.name,
            artist: painting.artist,
            height: painting.height,
            width: painting.width,
            colorsType: painting.colorsType,
            price: painting.price,
            state: painting.state,
            active: painting.active,
            image: painting.image,
            createdBy: painting.createdBy,
            updatedBy: painting.updatedBy,
            createDate: painting.createDate,
            updateDate: painting.updateDate,
            artType: painting.artType,
            gallery: painting.gallery,
            keyWords: painting.keyWords,
            story: painting.story
          });
        }
        console.log(this.paintings);
      }, error1 => {
        console.log(error1);
      }, () => {
        this.paintingsFilterList = this.paintingsList;
      });

    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.paintingsList.length
    };
  }

  // Fetch The Page Number On Page Change
  pageChanged(event) {
    this.config.currentPage = event;
  }

    // Delete painting Method
  delete(paintingId: number) {
    if (confirm('Are You Sure You Want To Delete This Painting')) {
      this.photosListService.deletePainting(paintingId).subscribe(
          data => {
            this.toaster.success('Painting Successfully Deleted');
            console.log('deleted Successfully: ', data);
          },
          error => {
            console.log('error : ', error);
            this.toaster.error('There Is An Error Please Try Again');
          }, () => {
            this.getPaintings();
          }
      );
    } else {
      return false;
    }
  }

  applyFilter() {
    // if the search input value is empty
    if (!this.name) {
      this.paintingsFilterList = [...this.paintingsList];
    } else {
      this.paintingsFilterList = [];
      this.paintingsFilterList = this.paintingsList.filter(res => {
        // Search In EntityName Column
        const nameResult = res.name.toLocaleLowerCase().match(this.name.toLocaleLowerCase());
        // Search In Interactions Column
        const artistResult = res.artist.toLocaleLowerCase().match(this.name.toLocaleLowerCase());
        // Search In Art Type Column
        const artTypeResult = res.artType.toLocaleLowerCase().match(this.name.toLocaleLowerCase());
        if (nameResult) {
          // display the EntityName Column
          return nameResult;
        } else if (artistResult) {
          // display the Interactions Column
          return artistResult;
        } else if (artTypeResult) {
          // display the ArtType Column
          return artTypeResult;
        }
      });
    }
  }
}
