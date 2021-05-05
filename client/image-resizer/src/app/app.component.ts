import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
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
    fileName: 'fff8a224-dab8-f7e9-16e3-6f0208b42f86.1.png',
    url: 'https://im-homework.s3.amazonaws.com/fff8a224-dab8-f7e9-16e3-6f0208b42f86.1.png?AWSAccessKeyId=AKIA3UJVVYF56FGPO3IY&Content-Type=image%2Fpng&Expires=1620201750&Signature=VyuDpLxsaYvijEz%2Bpljm37mBd20%3D&x-amz-tagging=public%3Dyes'
  }, {
    fileName: '51dc9c1e-cc29-64de-c592-f045c9decf53.3.png',
    url: 'https://im-homework.s3.amazonaws.com/51dc9c1e-cc29-64de-c592-f045c9decf53.3.png?AWSAccessKeyId=AKIA3UJVVYF56FGPO3IY&Content-Type=image%2Fpng&Expires=1620201750&Signature=EidxkvvLroHZt7rgo2cZcYKDVKw%3D&x-amz-tagging=public%3Dyes'
  }];

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
    this.fileUploadService.resizeFiles(this.uploadUrls, size).subscribe(console.log);
  }
}
