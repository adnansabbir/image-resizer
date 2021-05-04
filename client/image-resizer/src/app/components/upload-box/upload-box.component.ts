import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, FormControl, Validators} from '@angular/forms';
import {FileInput} from 'ngx-material-file-input';

@Component({
  selector: 'app-upload-box',
  templateUrl: './upload-box.component.html',
  styleUrls: ['./upload-box.component.scss']
})
export class UploadBoxComponent implements OnInit {
  filesForm = new FormControl('');
  errorText: string | null = null;

  @Output() select: EventEmitter<File[] | null> = new EventEmitter<File[] | null>();

  allowedFileFormat = '.png, .jpg, .jpeg';

  constructor() {
  }

  ngOnInit(): void {
    this.filesForm.valueChanges.subscribe((fileInput: FileInput) => {
      this.validateAndEmitData(fileInput);
    });
  }

  private validateAndEmitData(fileInput: FileInput): void {
    if (!fileInput) {
      this.errorText = null;
      this.select.emit(null);
      return;
    }

    const {files} = fileInput;

    if (files.length > 5) {
      this.errorText = 'Max 5 image allowed';
      this.select.emit(null);
    } else {
      this.errorText = null;
      this.select.emit(fileInput.files);
    }
  }
}
