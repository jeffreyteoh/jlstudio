import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { HttpClient } from '@angular/common/http';
import { saveAs } from 'file-saver';
import { FileDownloadEntity } from './file-download.entity';
import * as JSZip from 'jszip';

@Injectable({
  providedIn: 'root',
})
export class StorageService {

  constructor(private angularFireStorage: AngularFireStorage,
              private httpClient: HttpClient) {
  }

  public downloadZippedFiles(files: FileDownloadEntity[], zipName: string): void {

    const zipFile: JSZip = new JSZip();
    let count = 0;

    files.forEach(file => {
      this.angularFireStorage.ref('/' + file.name).getDownloadURL().subscribe(url => {
        this.httpClient.get(url, {responseType: 'blob'}).subscribe(response => {

          zipFile.file(file.fileName + file.extension, response, {binary: true});

          count++;
          if (count === files.length) {
            zipFile.generateAsync({type: 'blob'}).then(content => {
              saveAs(content, zipName + '.zip');
            });
          }
        });
      });
    });
  }
}
