import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-upload-box',
  templateUrl: './upload-box.component.html',
  styleUrls: ['./upload-box.component.scss']
})
export class UploadBoxComponent implements OnInit {
  filesForm = new FormControl();
  allowedFileFormat = '.png, .jpg, .jpeg';

  constructor() {
  }

  ngOnInit(): void {
  }

  onFileSelected($event: Event): void {
    console.log($event);
  }
}
