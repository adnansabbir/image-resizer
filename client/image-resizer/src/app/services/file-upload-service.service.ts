import {Injectable} from '@angular/core';
import {SizeDataModel} from '../components/size-selector/size-selector.component';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Guid} from 'guid-typescript';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

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

  getUploadUrls(files: File[]): Observable<FileUploadResponseModel[]> {
    const payload = files.map(file => ({fileName: file.name, type: file.type, fileId: Guid.raw()}));
    return this.http.post<FileUploadResponseModel[]>(
      this.serverUrl + 'getuploadurl',
      payload
    );
  }

  resizeFiles(files: FileUploadResponseModel[], size: SizeDataModel): Observable<FileUploadResponseModel[]> {
    const payload = files.map(file => ({fileName: file.fileName, fileSize: {height: size.height, width: size.width}}));
    return this.http.post<FileUploadResponseModel[]>(
      this.serverUrl + 'resize-images',
      payload
    );
  }

  private uploadFilesToUrls(files: File[], urlResponse: FileUploadResponseModel[]): void {
    const header = new HttpHeaders({});
    for (let i = 0; i < files.length; i++) {
      this.http.put(urlResponse[i].url, files[i], {headers: header}).subscribe(console.log);
    }
  }
}
