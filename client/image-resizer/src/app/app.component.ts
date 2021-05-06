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

  uploadUrls: FileUploadResponseModel[] = [];
  filesInProcess: FileUploadResponseModel[] = [];

  constructor(
    private fb: FormBuilder,
    private fileUploadService: FileUploadServiceService
  ) {
  }

  ngOnInit(): void {
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
      console.log('Use these urls to upload files');
      console.log(res.map(f => f.fileUrl));
    });
  }

  resizeFiles(): void {
    const {size} = this.resizeForm.value;
    this.fileUploadService.resizeFiles(this.uploadUrls, size).subscribe(res => {
      this.filesInProcess = res;
    });
  }
}
