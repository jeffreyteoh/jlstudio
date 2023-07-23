import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/shared/services/storage.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { fadeInOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';	
import { FirestoreService } from 'src/app/shared/services/firestore.service';
import { Category} from '../../../../shared/model/category.model';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
  animations: [
    fadeInOnEnterAnimation(),
    fadeOutOnLeaveAnimation()
  ]
})
export class GalleryComponent implements OnInit {
  categories: Category[] = [{id: 'all', name:'All'}];
  currentCategory: string = 'All';
  albums: string[] = ['test1'];
  pageSize: number = 20;
  pageToken: string | null = '';
  loadMoreButton: boolean = false;
  isLoading: boolean = false;
  isLoggedIn: boolean = false;
  defaulImage: string = 'assets/images/loading.webp';
  image: string = 'assets/images/JL.jpg'

  constructor(private storageService: StorageService, private authService: AuthService, private afs: FirestoreService) {
  }

  async loadFolders(): Promise<void> {
    const result = await this.storageService.listFolders(this.pageSize);
    this.albums = this.albums.concat(result.folders);

    this.pageToken = result.pageToken;
    if (this.pageToken) {
      this.loadMoreButton = true;
    }
  }

  async filter (cat: string): Promise<void> {
    this.currentCategory = cat;

  }


  ngOnInit() {
    this.loadFolders();

    this.isLoggedIn = true;

    this.getCategories();

  }
  //get Categories from Firestore
  getCategories() {

    this.afs.getCategories().subscribe(res => {
      this.categories = this.categories.concat(res);
    })
  }

}
