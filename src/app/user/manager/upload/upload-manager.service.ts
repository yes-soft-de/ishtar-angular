import {Injectable} from '@angular/core';
import {UploadRepoService} from '../../repository/upload/upload-repo.service';
import {Observable, Subject} from 'rxjs';
import {UploadResponse} from '../../entity-protected/upload/upload-response';
import {UserConfig} from '../../UserConfig';

@Injectable({
  providedIn: 'root'
})
export class UploadManagerService {
  repoSubject: Subject<UploadResponse>;
  repo$: Observable<UploadResponse>;

  managerSubject: Subject<UploadResponse>;
  manager$: Observable<UploadResponse>;

  constructor(private uploadService: UploadRepoService) {
  }

  // region Manager Facade
  // TODO: Move To Interface
  public uploadAvatarImage(image: File) {
    // start Listening
    this.repoSubject = new Subject<UploadResponse>();
    this.repo$ = this.repoSubject.asObservable();
    this.logUploadError();

    // Prepare Post, Validation Can Be Implemented Here
    const formData = new FormData();
    formData.append('image', image);

    // Start Posting Process
    this.uploadService.uploadImage(UserConfig.clientImageUploadAPI, formData, this.repoSubject);
  }

  public uploadGeneralImage(image: File) {
    this.repoSubject = new Subject<UploadResponse>();
    this.repo$ = this.repoSubject.asObservable();
    this.logUploadError();
    const formData = new FormData();
    formData.append('image', image);
    this.uploadService.uploadImage(UserConfig.generalUploadAPI, formData, this.repoSubject);
  }

  public uploadPaintingImage(image: File) {
    this.repoSubject = new Subject<UploadResponse>();
    this.repo$ = this.repoSubject.asObservable();
    this.logUploadError();
    const formData = new FormData();
    formData.append('image', image);
    this.uploadService.uploadImage(UserConfig.paintingUploadAPI, formData, this.repoSubject);
  }

  // endregion

  // Private logging, Should Be Controller By a Config
  private logUploadError() {
    this.repoSubject.asObservable().subscribe(
      data => {
        this.managerSubject.next(data);
      }, error => {
        console.log(error);
        this.managerSubject.error(error);
      }
    );
  }

  // Listen To
  public getObservable(): Observable<UploadResponse> {
    return this.manager$;
  }
}
