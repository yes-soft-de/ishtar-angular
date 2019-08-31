import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Painting} from '../../../entity/painting/painting';
import {PhotosListService} from '../../../service/PhotosList/photos-list.service';
import {PaintingInterface} from '../../../entity/painting/painting-interface';
import {PaintingListResponse} from '../../../entity/PaintingList/painting-list-response';

@Component({
  selector: 'app-list-painting',
  templateUrl: './list-painting.component.html',
  styleUrls: ['./list-painting.component.scss']
})
export class ListPaintingComponent implements OnInit {
  public paintings: Painting[];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private photosListService: PhotosListService ) { }

  ngOnInit() {
    // Fetch All Paintings
    this.photosListService.getAllPainting().subscribe(
        (res: PaintingListResponse) => {
          this.paintings = res.Data;
      }, error1 => {
        console.log(error1);
      });
    // get Artist By ID
    // this.photosListService.getPaintingInfo(
    //   this.route.snapshot.queryParamMap.get('id')
    // ).subscribe(
    //     data => {
    //       console.log(data);
    //     },
    //     error => {
    //       console.log('There is an error : ', error);
    //     },
    //     () => {
    //       console.log('done');
    //     }
    // );

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
          this.router.navigate(['/admin/list-painting']);
        }
    );
  }
}
