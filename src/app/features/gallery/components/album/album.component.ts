import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/shared/services/storage.service';
import { ActivatedRoute } from '@angular/router';
import lgZoom from 'lightgallery/plugins/zoom';
import { BeforeSlideDetail } from 'lightgallery/lg-events';

interface Album {
  name: string;
  cover: string;
}


@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss'],
})

export class AlbumComponent implements OnInit {
  folders: string[] = [];
  newFolderName: string = '';
  loading: boolean = false;
  disableDelete: boolean = true;
  disableRename: boolean = true;
  pageSize: number = 20;
  pageToken: string | null = '';
  loadMoreButton: boolean = false;

  album: Album = {
    name: '',
    cover: 'assets/images/carousel2.jpg',
  };

  settings = {
    counter: false,
    plugins: [lgZoom],
};

  constructor(private storageService: StorageService, private route: ActivatedRoute) {
    this.route.params.subscribe( params => this.album.name = decodeURIComponent(params.name));
  }

  ngOnInit(): void {
    // Load existing folders from Firebase Storage
    this.loadFolders();
  }

  async loadFolders(): Promise<void> {
    // Retrieve the list of folders from Firebase Storage
    const result = await this.storageService.listFolders(this.pageSize, null , this.album.name + '/');
    this.folders = result.folders;

    this.pageToken = result.pageToken;
    if (this.pageToken) {
      this.loadMoreButton = true;
    }
  }

  /**
   * Loads more data from the storage service.
   *
   * @return {void} This function does not return a value.
   */
  async loadMore(): Promise<void> {
    const result = await this.storageService.listFolders(
      this.pageSize,
      this.pageToken ?? ''
    );
    this.folders = result.folders;
    this.pageToken = result.pageToken;

    if (this.pageToken) {
      this.loadMoreButton = true;
    } else {
      this.loadMoreButton = false;
    }

  }
  

  onScroll($event: any): void {
    console.log($event);
  }

  onBeforeSlide = (detail: BeforeSlideDetail): void => {
    const { index, prevIndex } = detail;
    console.log(index, prevIndex);
  };

}
