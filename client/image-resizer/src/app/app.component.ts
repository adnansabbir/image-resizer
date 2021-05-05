import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SizeDataModel} from './components/size-selector/size-selector.component';
import {FileUploadServiceService} from './services/file-upload-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  resizeForm = this.fb.group({
    files: [null, Validators.required],
    size: [null, Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private fileUploadService: FileUploadServiceService
  ) {
  }

  ngOnInit(): void {
    this.resizeForm.valueChanges.subscribe(console.log);
  }

  onFileSelect($event: File[] | null): void {
    this.resizeForm.get('files')?.setValue($event);
  }

  onSizeSelect($event: SizeDataModel): void {
    this.resizeForm.get('size')?.setValue($event);
  }

  uploadFiles(): void {
    const {files, size} = this.resizeForm.value;
    this.fileUploadService.uploadFilesForResize(files, size);
  }
}
