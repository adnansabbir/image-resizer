import {Component, Input, OnInit} from '@angular/core';
import {FileUploadResponseModel} from '../../services/file-upload-service.service';

@Component({
  selector: 'app-files-in-process',
  templateUrl: './files-in-process.component.html',
  styleUrls: ['./files-in-process.component.scss']
})
export class FilesInProcessComponent implements OnInit {
  @Input() filesInProcess: FileUploadResponseModel[] = [];

  constructor() {
  }

  ngOnInit(): void {
  }

  extractFileName(file: FileUploadResponseModel): string {
    const fileNameArray = file.fileName.split('.');
    return `${fileNameArray[1]}.${fileNameArray[2]}`;
  }

}
