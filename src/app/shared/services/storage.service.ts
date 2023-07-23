import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { HttpClient } from '@angular/common/http';
import { saveAs } from 'file-saver';
import { FileDownloadEntity } from '../../features/dashboard/services/file-download.entity';
import * as JSZip from 'jszip';
import { map, firstValueFrom, finalize } from 'rxjs';
import { ListResult } from '@angular/fire/compat/storage/interfaces';

interface ListFoldersResult {
  folders: string[];
  pageToken: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(
    private angularFireStorage: AngularFireStorage,
    private httpClient: HttpClient
  ) {}

  folders: string[] = [];

  public downloadZippedFiles(
    files: FileDownloadEntity[],
    zipName: string
  ): void {
    const zipFile: JSZip = new JSZip();
    let count = 0;

    files.forEach((file) => {
      this.angularFireStorage
        .ref('/' + file.name)
        .getDownloadURL()
        .subscribe((url: string) => {
          this.httpClient
            .get(url, { responseType: 'blob' })
            .subscribe(
              (
                response:
                  | string
                  | Blob
                  | ArrayBuffer
                  | number[]
                  | Uint8Array
                  | NodeJS.ReadableStream
                  | Promise<
                      | string
                      | Blob
                      | ArrayBuffer
                      | number[]
                      | Uint8Array
                      | NodeJS.ReadableStream
                    >
              ) => {
                zipFile.file(file.fileName + file.extension, response, {
                  binary: true,
                });

                count++;
                if (count === files.length) {
                  zipFile.generateAsync({ type: 'blob' }).then((content) => {
                    saveAs(content, zipName + '.zip');
                  });
                }
              }
            );
        });
    });
  }

  public async folderExists(folderPath: string): Promise<boolean> {
    try {
      return (await this.listAllFolders()).some(
        (name) => name === folderPath
      );
    } catch (error) {
      console.error('Error occurred while checking folder existence:', error);
      return false;
    }
  }

  public uploadFile(file: any, path: string) {
    const ref = this.angularFireStorage.ref(path);
    const task = ref.put(file);
    const folder = path.split('/')[1];

    this.folders.push(folder);

    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          ref.getDownloadURL().subscribe((downloadURL: string) => {
            console.log('File available at:', downloadURL);
          });
        })
      )
      .subscribe((snapshot: any) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload progress: ${progress}%`);
      });
  }

  public async listAllFolders(): Promise<string[]> {
    if (this.folders.length > 0) {
      return this.folders;
    }

    const storageRef = this.angularFireStorage.ref('/');
    const listResult = await firstValueFrom(storageRef.listAll());
  
    const folderNames = listResult.prefixes.map((prefix) => prefix.fullPath);
    this.folders = folderNames;
  
    return folderNames;
  }

  public async listFolders(
    pageSize: number,
    pageToken?: string | null,
    pageName: string = '/'
  ): Promise<{ folders: string[]; pageToken: string | null; items: any[] }> {
    const options = {
      maxResults: pageSize,
      pageToken: pageToken
    };
  
    console.log(pageName);
  
    const result: ListResult | undefined = await firstValueFrom(
      this.angularFireStorage.ref(pageName).list(options).pipe(
        map((r: ListResult) => ({
          prefixes: r.prefixes,
          items: r.items,
          nextPageToken: r.nextPageToken ?? null
        }))
      )
    );
  
    if (!result) {
      throw new Error('Failed to retrieve folder list');
    }
  
    const folders = result.prefixes.map(prefix => prefix.name);
    const nextPageToken = result.nextPageToken;
  
    return { folders, pageToken: nextPageToken, items: result.items };
  }

  isValidFileName(name: string): boolean {
    return name.length > 0;
  }

}
