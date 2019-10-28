import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Painting} from '../../../entity/painting/painting';
import {PhotosListService} from '../../../service/PhotosList/photos-list.service';
import {PaintingInterface} from '../../../entity/painting/painting-interface';
import {PaintingListResponse} from '../../../entity/PaintingList/painting-list-response';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-list-painting',
  templateUrl: './list-painting.component.html',
  styleUrls: ['./list-painting.component.scss']
})
export class ListPaintingComponent implements OnInit, OnDestroy {
  public paintings: Painting[];
  allPaintingObservable: Subscription;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private photosListService: PhotosListService ) { }

  ngOnInit() {
    // Fetch All Paintings
    this.allPaintingObservable = this.photosListService.getAllPainting().subscribe(
        (res: PaintingListResponse) => {
          this.paintings = res.Data;
          console.log(this.paintings);
      }, error1 => {
        console.log(error1);
      });
  }

  ngOnDestroy() {
    this.allPaintingObservable.unsubscribe();
  }

    // Delete painting Method
  delete(paintingId: number) {
    this.photosListService.deletePainting(paintingId).subscribe(
        data => {
          console.log('the delete request was successfully done', data);
        },
        error => {
          console.log('Sorry There Is Error : ', error);
        },
        () => {
          this.router.navigate(['/admin/list-paintings']);
        }
    );
  }
}
