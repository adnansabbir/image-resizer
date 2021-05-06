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
    fileName: 'da962a8e-e53c-d8f0-4996-5adf91c42e2f.Elephant_Large_PNG_Clipart-1047.png',
    fileUrl: 'https://im-homework.s3.amazonaws.com/da962a8e-e53c-d8f0-4996-5adf91c42e2f.Elephant_Large_PNG_Clipart-1047.png?AWSAccessKeyId=AKIA3UJVVYF56FGPO3IY&Content-Type=image%2Fpng&Expires=1620300679&Signature=RVmW9dWLDou4ma2LS2pHVVIiTo8%3D&x-amz-tagging=public%3Dyes',
    fileId: 'da962a8e-e53c-d8f0-4996-5adf91c42e2f'
  }, {
    fileName: 'cfe4eac7-907a-0b7f-bb58-635543a7b9b0.item.png',
    fileUrl: 'https://im-homework.s3.amazonaws.com/cfe4eac7-907a-0b7f-bb58-635543a7b9b0.item.png?AWSAccessKeyId=AKIA3UJVVYF56FGPO3IY&Content-Type=image%2Fpng&Expires=1620300679&Signature=6XjUpzNuvdczHtHgY3oolXJkLVY%3D&x-amz-tagging=public%3Dyes',
    fileId: 'cfe4eac7-907a-0b7f-bb58-635543a7b9b0'
  }, {
    fileName: '3e6eb819-4514-2165-da4b-2eb554f9f707.pexels-tobi-620337.jpg',
    fileUrl: 'https://im-homework.s3.amazonaws.com/3e6eb819-4514-2165-da4b-2eb554f9f707.pexels-tobi-620337.jpg?AWSAccessKeyId=AKIA3UJVVYF56FGPO3IY&Content-Type=image%2Fjpeg&Expires=1620300679&Signature=KbcO314IuZV3rQtcUfoGNCydt9Q%3D&x-amz-tagging=public%3Dyes',
    fileId: '3e6eb819-4514-2165-da4b-2eb554f9f707'
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
