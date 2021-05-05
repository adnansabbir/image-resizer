import {Injectable} from '@angular/core';
import {SizeDataModel} from '../components/size-selector/size-selector.component';
import {HttpClient} from '@angular/common/http';
import {Guid} from 'guid-typescript';

export interface FileUploadResponseModel {
  fileName: string;
  url: string;
}

@Injectable({
  providedIn: 'root'
})
export class FileUploadServiceService {
  serverUrl = 'http://localhost:3000/';

  constructor(
    private http: HttpClient
  ) {
  }

  uploadFilesForResize(files: File[], size: SizeDataModel): void {
    const payload = files.map(file => {
      const fileNameSplited = file.name.split('.');
      const fileExtension = fileNameSplited[fileNameSplited.length - 1];
      return {fileExtension, fileId: Guid.raw()};
    });
    this.http.post<FileUploadResponseModel[]>(
      this.serverUrl + 'getuploadurl',
      payload
    ).subscribe((urlResponse: FileUploadResponseModel[]) => {
      this.uploadFilesToUrls(files, urlResponse);
    });
  }

  private uploadFilesToUrls(files: File[], urlResponse: FileUploadResponseModel[]): void {
    for (let i = 0; i < files.length; i++) {
      this.http.put(urlResponse[i].url, files[i]).subscribe(console.log);
    }
  }
}
