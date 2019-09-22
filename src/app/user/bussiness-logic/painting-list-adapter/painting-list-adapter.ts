import {PaintingListService} from '../../service/painting-list/painting-list.service';
import {ImageListService} from '../../service/images-list/image-list.service';

export class PaintingListAdapter {

  constructor(private paintingService: PaintingListService, private imageService: ImageListService) {
  }

  getPaintingList() {
  }
}
