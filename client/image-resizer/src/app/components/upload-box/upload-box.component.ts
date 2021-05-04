import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, FormControl} from '@angular/forms';

@Component({
  selector: 'app-upload-box',
  templateUrl: './upload-box.component.html',
  styleUrls: ['./upload-box.component.scss']
})
export class UploadBoxComponent implements OnInit {
  filesForm = new FormControl();

  @Output() change: EventEmitter<File[]> = new EventEmitter<File[]>();

  allowedFileFormat = '.png, .jpg, .jpeg';

  constructor() {
  }

  ngOnInit(): void {
    this.filesForm.valueChanges.subscribe(res => {
      console.log(res);
    });
  }
}
