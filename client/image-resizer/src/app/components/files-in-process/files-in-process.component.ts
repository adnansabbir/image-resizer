import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FileUploadResponseModel, FileUploadServiceService} from '../../services/file-upload-service.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-files-in-process',
  templateUrl: './files-in-process.component.html',
  styleUrls: ['./files-in-process.component.scss']
})
export class FilesInProcessComponent implements OnInit, OnDestroy {
  @Input()
  set filesInProcess(files: FileUploadResponseModel[]) {
    files.forEach(f => this.filesObject[f.fileId] = {...f});
    this.files = [...files];
  }

  filesObject: { [key: string]: FileUploadResponseModel } = {};
  files: FileUploadResponseModel[] = [];
  interval: any;

  constructor(
    private fileUploadService: FileUploadServiceService
  ) {
  }

  ngOnInit(): void {
    this.longPoolFileStatus();
    this.files = this.filesInProcess;
  }

  extractFileName(file: FileUploadResponseModel): string {
    const fileNameArray = file.fileName.split('.');
    return `${fileNameArray[1]}.${fileNameArray[2]}`;
  }

  private longPoolFileStatus(): void {
    this.interval = setInterval(() => {
      if (this.files.filter(f => this.filesObject[f.fileId].status === 'InQueue').length) {
        this.fileUploadService.getFileStatus(this.files.map(fp => fp.fileId))
          .subscribe(res => {
            res.forEach(file => {
              switch (file.status) {
                case 'Success':
                  this.filesObject[file.fileId] = {...file};
                  break;
                case 'Failed':
                  this.filesObject[file.fileId] = {...file, fileUrl: 'https://cdn0.iconfinder.com/data/icons/shift-free/32/Error-512.png'};
                  break;
              }
            });
          });
      }
    }, 1000);
  }

  ngOnDestroy(): void {
  }
}
