import {Injectable} from '@angular/core';
import {UploadRepoService} from '../../repository/upload/upload-repo.service';
import {Observable, Subject} from 'rxjs';
import {UploadResponse} from '../../entity-protected/upload/upload-response';

@Injectable({
  providedIn: 'root'
})
export class UploadManagerService {
  eventHandler: Subject<UploadResponse>;

  constructor(private uploadService: UploadRepoService) {
    this.eventHandler = new Subject<UploadResponse>();
    this.logUploadError();
  }

  public uploadImage(image: File) {
    const formData = new FormData();
    formData.append('image', image);
    this.uploadService.uploadImage(formData, this.eventHandler);
  }

  private logUploadError() {
    this.eventHandler.asObservable().subscribe(
      data => {
        // TODO Do Something With the Response
      }, error => {
        console.log(error);
      }
    );
  }

  public getObservable(): Observable<UploadResponse> {
    return this.eventHandler.asObservable();
  }
}
