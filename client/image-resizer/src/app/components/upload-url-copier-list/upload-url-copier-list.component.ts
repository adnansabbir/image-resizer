import {Component, Input, OnInit} from '@angular/core';
import {FileUploadResponseModel} from '../../services/file-upload-service.service';
import {Clipboard} from '@angular/cdk/clipboard';

@Component({
  selector: 'app-upload-url-copier-list',
  templateUrl: './upload-url-copier-list.component.html',
  styleUrls: ['./upload-url-copier-list.component.scss']
})
export class UploadUrlCopierListComponent implements OnInit {
  @Input() uploadUrls: FileUploadResponseModel[] = [];

  constructor(private clipboard: Clipboard) {
  }

  ngOnInit(): void {
  }

  extractFileName(file: FileUploadResponseModel): string {
    const fileNameArray = file.fileName.split('.');
    return `${fileNameArray[1]}.${fileNameArray[2]}`;
  }

  copyUrl(url: FileUploadResponseModel): void {
    this.clipboard.copy(url.fileUrl);
  }
}
