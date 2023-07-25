import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/shared/services/storage.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import {
  fadeInOnEnterAnimation,
  fadeOutOnLeaveAnimation,
} from 'angular-animations';
import { FirestoreService } from 'src/app/shared/services/firestore.service';
import { Category } from '../../../../shared/model/category.model';
import { Album } from '../../../../shared/model/album.model';
import { ActivatedRoute } from '@angular/router';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
  animations: [fadeInOnEnterAnimation(), fadeOutOnLeaveAnimation()],
})
export class GalleryComponent implements OnInit {
  [x: string]: any;
  categories: Category[] = [{ id: 'all', name: 'All' }];
  currentCategory: string = 'All';
  albums: Album[] = [];
  pageSize: number = 20;
  loadMoreButton: boolean = false;
  isLoading: boolean = false;
  isLoggedIn: boolean = false;
  defaulImage: string = 'assets/images/loading.webp';
  image: string = 'assets/images/JL.jpg';
  pageToken: any = null;

  constructor(
    private storageService: StorageService,
    private authService: AuthService,
    private afs: FirestoreService,
    private route: ActivatedRoute,
    private viewportScroller: ViewportScroller

    ) {}

  /**
   * Loads folders asynchronously.
   *
   * @return {Promise<void>} A promise that resolves when the folders are loaded.
   */
  async loadFolders(): Promise<void> {
    const result = await this.afs.getAlbums(20, this.pageToken);

    this.pageToken = result[result.length - 1].id;

    this.albums = this.albums.concat(result);

    if (result.length === 20) {
      this.loadMoreButton = true;
    }
  }

  async filter(cat: string, $event: Event) {
    $event.stopPropagation();
    this.currentCategory = cat;
  }

  /**
   * Initializes the component and loads the folders, sets the isLoggedIn flag to true,
   * and gets the categories.
   *
   * @param {type} paramName - description of parameter
   * @return {type} description of return value
   */
  ngOnInit() {
    this.loadFolders();

    this.isLoggedIn = true;

    this.getCategories();

    this.route.queryParams.subscribe((params) => {
      if (params.cat) {
        this.currentCategory = params.cat;
        this.viewportScroller.scrollToAnchor('gallery');
      }
    });
  }

  toSection(section: string): void {
    const elem = document.getElementById(section);
    const topPos = elem?.offsetTop;
    if (topPos !== undefined) {
      document.body?.scrollTo({ top: topPos - 10, behavior: 'smooth' });

        console.log();
    }
  }

  /**
   * Retrieves categories from Firestore and updates the `categories` array.
   */
  getCategories() {
    this.categories = [{ id: 'all', name: 'All' }];

    let subscription = this.afs.getCategories().subscribe((res) => {
      this.categories = [...this.categories, ...res];
      subscription.unsubscribe();
    });
  }

  /**
   * Updates the category with the given ID.
   *
   * @param {string} id - The ID of the category to update.
   * @param {Event} $event - The event object associated with the update.
   * @return {void} This function does not return a value.
   */
  async updateCategory(
    id: string | undefined,
    $event: Event,
    curCats: any = []
  ) {
    if (!id) {
      return;
    }

    const target = $event.target as HTMLInputElement;
    const editedCats: string[] = target.innerText
      .trim()
      .split(',')
      .map((cat) => cat.trim())
      .filter((cat) => cat !== '');

    let new_existing_cat: string[] = [];
    let album: any = this.getAlbumById(id) || {};

    //create new category
    for (const editedCat of editedCats) {
      if (!curCats.includes(editedCat)) {
        try {
          await this.afs.addCategory({ name: editedCat, albums: [] });
        } catch (e) {
          console.log(e);
        }
      } else {
        new_existing_cat.push(editedCat);
      }
    }

    //remove album field of Category
    for (const curCat of curCats) {
      if (!new_existing_cat.includes(curCat)) {
        await this.removeAlbumFromCategory(id, curCat);
      }
    }

    album.category = editedCats;

    album = Object.assign({}, album);
    delete album.id;

    //update album
    await this.afs.setAlbum(id, album);
    this.getCategories();
  }

  /**
   * Returns the album with the given ID.
   * @param {string} id - The ID of the album.
   * @return {Album} The album with the given ID.
   * */
  getAlbumById(id: string) {
    return this.albums.find((album) => album.id === id);
  }

  /**
   * Removes an album from a category.
   *
   * @param {string} albumId - The ID of the album to remove.
   * @param {string} catName - The name of the category.
   * @return {Promise<void>} A promise that resolves when the album is removed from the category.
   */
  async removeAlbumFromCategory(albumId: string, catName: string) {
    let cat: any = Object.assign({}, this.getCategoryByName(catName));

    if (Object.keys(cat).length === 0) {
      return;
    }

    const id: string | undefined = cat.id;
    delete cat.id;
    cat.albums = cat.albums?.filter((id: any) => id !== albumId);

    if (!id) {
      return;
    }

    if (cat.albums && cat.albums.length > 0) {
      return await this.afs.setCategory(id, cat);
    } else {
      return await this.afs.deleteCategory(id);
    }
  }

  getCategoryByName(name: string) {
    return this.categories.find((category) => category.name === name);
  }

  /**
   * Finds a category by its ID.
   *
   * @param {string} id - The ID of the category.
   * @return {Category | undefined} The category with the specified ID, or undefined if not found.
   */
  getCategoryById(id: string) {
    return this.categories.find((category) => category.id === id);
  }

  /**
   * Check if the current category is included in the given array of categories.
   *
   * @param {string[]} cats - The array of categories to check.
   * @return {boolean} - True if the current category is included in the array; false otherwise.
   */
  checkCategory(cats: string[] = []) {
    return (
      cats.includes(this.currentCategory) || this.currentCategory === 'All'
    );
  }
}
