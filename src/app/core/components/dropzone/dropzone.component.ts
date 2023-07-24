import { Component, ViewChild, ElementRef } from '@angular/core';

import { NgxFileDropEntry, FileSystemFileEntry } from 'ngx-file-drop';
import { StorageService } from 'src/app/shared/services/storage.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { FirestoreService } from 'src/app/shared/services/firestore.service';

interface FileEntry extends FileSystemFileEntry {
  fullPath: string;
}

@Component({
  selector: 'app-dropzone',
  templateUrl: './dropzone.component.html',
  styleUrls: ['./dropzone.component.scss'],
})
export class DropzoneComponent {
  @ViewChild('dropzone', { static: true }) dropzoneElement!: ElementRef;
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  constructor(
    private storageService: StorageService,
    private toastService: ToastService,
    private afs: FirestoreService
  ) {}

  async handleFileDrop(files: NgxFileDropEntry[]) {
    const entry = files[0].fileEntry as FileEntry;
    const folderPath = entry.fullPath.split('/')[1];
    const folderExists = await this.storageService.folderExists(folderPath);
    const total = files.length;
    let uploaded = 0;

    if (folderExists) {
      this.toastService.show('Album already exists', 'danger');
      return;
    }

    for (const droppedFile of files) {
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileEntry;
        const file: File = (await this.getFile(fileEntry)) as File;
        const thumbnail = await this.generateThumbnail(file);
        const thumbnailPath = fileEntry.fullPath.replace(
          file.name,
          'thumbnail/' + file.name
        );

        await this.storageService.uploadFile(file, fileEntry.fullPath);
        await this.storageService.uploadFile(thumbnail, thumbnailPath);
        uploaded++;

        this.toastService.show(
          folderPath + ' uploaded: ' + uploaded + '/' + total,
          'success'
        );
      } else {
        this.toastService.show('Invalid file type', 'danger');
      }
    }

    let res = await this.storageService.listFolders(
      20,
      null,
      folderPath + '/cover/thumbnail'
    );

    let thumbnailUrl = await res.items[0].getDownloadURL() ?? null;

    await this.afs.addAlbum({
      name: folderPath,
      thumbnailUrl: thumbnailUrl,
      uploadedAt: new Date(),
    });

    this.toastService.show('Album created', 'success');
  }

  generateThumbnail(file: any): Promise<Blob> {
    return new Promise<Blob>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        const originalImage = new Image();
        originalImage.onload = () => {
          const thumbnailWidth = 1280;
          const thumbnailHeight = 720;

          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');

          if (ctx) {
            const imageWidth = originalImage.width;
            const imageHeight = originalImage.height;

            let reducedWidth;
            let reducedHeight;

            if (imageHeight > imageWidth) {
              reducedHeight = thumbnailHeight;
              reducedWidth = imageWidth * (thumbnailHeight / imageHeight);
            } else {
              reducedWidth = thumbnailWidth;
              reducedHeight = imageHeight * (thumbnailWidth / imageWidth);
            }

            canvas.width = reducedWidth;
            canvas.height = reducedHeight;

            ctx.drawImage(originalImage, 0, 0, reducedWidth, reducedHeight);

            canvas.toBlob((blob) => {
              if (blob) {
                resolve(blob);
              } else {
                reject('Error creating thumbnail blob');
              }
            }, 'image/jpeg');
          } else {
            reject('Could not obtain canvas context');
          }
        };

        originalImage.src = event.target.result;
      };

      reader.onerror = (event) => {
        reject('Error reading file');
      };

      reader.readAsDataURL(file);
    });
  }

  private getFile(fileEntry: FileSystemFileEntry) {
    return new Promise((resolve, reject) => {
      fileEntry.file((file: File) => {
        // Handle individual file
        resolve(file);
      });
    });
  }

  openDialog() {
    this.fileInput.nativeElement.click();
  }

  handleFileSelect(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const fileList = inputElement.files;
    // Handle selected file(s)
    console.log('Selected Files:', fileList);
  }
}
