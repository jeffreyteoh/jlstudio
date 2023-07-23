import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Category } from '../model/category.model';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  private categoriesCollection: AngularFirestoreCollection<Category>;

  constructor(private afs: AngularFirestore) {
    // Set the Firestore collection reference
    this.categoriesCollection = this.afs.collection<Category>('category');
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
  updateCategory(id: string, category: Category): Promise<void> {
    return this.categoriesCollection.doc<Category>(id).update(category);
  }

  // Method to delete a category
  deleteCategory(id: string): Promise<void> {
    return this.categoriesCollection.doc<Category>(id).delete();
  }
}
