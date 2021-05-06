import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {SizeDataModel} from './components/size-selector/size-selector.component';
import {FileUploadResponseModel, FileUploadServiceService} from './services/file-upload-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  resizeForm = this.fb.group({
    files: [null, Validators.required],
    size: [{height: 1080, width: 1920}, Validators.required]
  });

  uploadUrls: FileUploadResponseModel[] = [{
    fileName: '939173d1-90e9-6358-3373-71053b551fe6.1.png',
    fileUrl: 'https://im-homework.s3.amazonaws.com/939173d1-90e9-6358-3373-71053b551fe6.1.png?AWSAccessKeyId=AKIA3UJVVYF56FGPO3IY&Content-Type=image%2Fpng&Expires=1620276415&Signature=yqNAB8vn6gjOXwYYlpK%2BAuj1gWM%3D&x-amz-tagging=public%3Dyes',
    fileId: '939173d1-90e9-6358-3373-71053b551fe6'
  }, {
    fileName: '3e004b9d-540f-ac11-cdfd-7d0d4f1eb769.3.png',
    fileUrl: 'https://im-homework.s3.amazonaws.com/3e004b9d-540f-ac11-cdfd-7d0d4f1eb769.3.png?AWSAccessKeyId=AKIA3UJVVYF56FGPO3IY&Content-Type=image%2Fpng&Expires=1620276415&Signature=II9gJgld1edTN%2Bwt9GG%2ByOXkrNA%3D&x-amz-tagging=public%3Dyes',
    fileId: '3e004b9d-540f-ac11-cdfd-7d0d4f1eb769'
  }];
  filesInProcess: FileUploadResponseModel[] = [];

  constructor(
    private fb: FormBuilder,
    private fileUploadService: FileUploadServiceService
  ) {
  }

  ngOnInit(): void {
    this.resizeForm.valueChanges.subscribe(console.log);
  }

  onFileSelect($event: File[] | null): void {
    if (!$event) {
      this.uploadUrls = [];
    }
    this.resizeForm.get('files')?.setValue($event);
  }

  onSizeSelect($event: SizeDataModel): void {
    if (!$event) {
      this.uploadUrls = [];
    }
    this.resizeForm.get('size')?.setValue($event);
  }

  uploadFiles(): void {
    const {files} = this.resizeForm.value;
    this.fileUploadService.getUploadUrls(files).subscribe(res => {
      this.uploadUrls = res;
    });
  }

  resizeFiles(): void {
    const {size} = this.resizeForm.value;
    this.fileUploadService.resizeFiles(this.uploadUrls, size).subscribe(res => {
      this.filesInProcess = res;
    });
  }
}
