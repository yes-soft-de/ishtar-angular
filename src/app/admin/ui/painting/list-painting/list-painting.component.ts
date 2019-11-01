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
        console.log(this.paintings);
      }, error1 => {
        console.log(error1);
      });
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
}
