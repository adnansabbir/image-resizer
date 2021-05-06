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
    fileName: 'd879ca2d-c6c5-4858-dec9-14d5aa87a747.1.png',
    url: 'https://im-homework.s3.amazonaws.com/d879ca2d-c6c5-4858-dec9-14d5aa87a747.1.png?AWSAccessKeyId=AKIA3UJVVYF56FGPO3IY&Content-Type=image%2Fpng&Expires=1620274997&Signature=RfENXwpEsfsg83uTnz09hpGK110%3D&x-amz-tagging=public%3Dyes',
    fileId: 'd879ca2d-c6c5-4858-dec9-14d5aa87a747'
  }, {
    fileName: '61948682-f64c-396d-a8a9-3c82de823145.3.png',
    url: 'https://im-homework.s3.amazonaws.com/61948682-f64c-396d-a8a9-3c82de823145.3.png?AWSAccessKeyId=AKIA3UJVVYF56FGPO3IY&Content-Type=image%2Fpng&Expires=1620274997&Signature=CjnFZo8Iigi1ZefjQmAEUWFzk8M%3D&x-amz-tagging=public%3Dyes',
    fileId: '61948682-f64c-396d-a8a9-3c82de823145'
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
