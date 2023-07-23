export class FileDownloadEntity {

    name: string;
    fileName: string;
    extension: string;
  
    constructor(name: string, fileName: string, extension: string) {
      this.name = name;
      this.fileName = fileName;
      this.extension = extension;
    }
  }