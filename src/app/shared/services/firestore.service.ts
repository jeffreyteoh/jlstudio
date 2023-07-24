import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentReference,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Category } from '../model/category.model';
import { Album } from '../model/album.model';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  private categoriesCollection: AngularFirestoreCollection<Category>;
  private albumsCollection: AngularFirestoreCollection<Album>;

  constructor(private afs: AngularFirestore) {
    // Set the Firestore collection reference
    this.categoriesCollection = this.afs.collection<Category>('category');
    this.albumsCollection = this.afs.collection<Album>('album');
  }

  // Method to get all categories
  getCategories(): Observable<Category[]> {
    return this.categoriesCollection.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data() as Category;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  // Method to add a new category
  addCategory(category: Category): Promise<DocumentReference<Category>> {
    return this.categoriesCollection.add(category);
  }

  // Method to update an existing category
  updateCategory(id: string, category: any): Promise<void> {
    return this.categoriesCollection.doc<Category>(id).update(category);
  }

  setCategory(id: string, category: any) {
    return this.categoriesCollection.doc<Category>(id).set(category);
  }

  // Method to delete a category
  deleteCategory(id: string): Promise<void> {
    return this.categoriesCollection.doc<Category>(id).delete();
  }

  // Method to get all categories
  async getAlbums(
    pageSize: number,
    pageToken: string | null
  ): Promise<Album[]> {
    let query = this.albumsCollection.ref.orderBy('uploadedAt').limit(pageSize);

    if (pageToken) {
      const lastDoc = this.albumsCollection.doc(pageToken).get();
      query = query.startAfter(lastDoc);
    }

    const snapshot = await query.get();

    return snapshot.docs.map((doc) => {
      const data = doc.data() as Album;
      const id = doc.id;
      return { id, ...data };
    });
  }

  // Method to add a new category
  addAlbum(album: Album): Promise<DocumentReference<Album>> {
    return this.albumsCollection.add(album);
  }

  // Method to update an existing category
  updateAlbum(id: string, album: any): Promise<void> {
    return this.albumsCollection.doc<Album>(id).update(album);
  }

  setAlbum(id : string, album: Album): Promise<void> {
    return this.albumsCollection.doc<Album>(id).set(album);
  }

  // Method to delete a category
  deleteAlbum(id: string): Promise<void> {
    return this.albumsCollection.doc<Album>(id).delete();
  }
}
