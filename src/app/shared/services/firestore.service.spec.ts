import { TestBed } from '@angular/core/testing';

import { FirestoreService } from './firestore.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Album } from '../model/album.model';
import { of } from 'rxjs';


describe('FirestoreService', () => {
  let service: FirestoreService;
  let afs: jasmine.SpyObj<AngularFirestore>;
  let albumsCollectionSpy: jasmine.SpyObj<AngularFirestoreCollection<Album>>;

  beforeEach(() => {
    const afsSpy = jasmine.createSpyObj('AngularFirestore', ['collection']);
    const albumsCollectionSpy = jasmine.createSpyObj<AngularFirestoreCollection<Album>>('AngularFirestoreCollection', ['snapshotChanges']);


    TestBed.configureTestingModule({
      providers: [
        FirestoreService,
        { provide: AngularFirestore, useValue: afsSpy }
      ]
    });

    service = TestBed.inject(FirestoreService);
    afs = TestBed.inject(AngularFirestore) as jasmine.SpyObj<AngularFirestore>;

    afs.collection.and.returnValue(albumsCollectionSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('createAlbum', () => {
    it('should create a new album', () => {
      const album: Album = { id: '1', name: 'New Album', thumbnailUrl: 'test', category: ['test'] };
      const docSpy = jasmine.createSpyObj('AngularFirestoreDocument', ['set']);

      albumsCollectionSpy.doc.withArgs('1').and.returnValue(docSpy);
      docSpy.set.and.returnValue(Promise.resolve());

      service.addAlbum(album);

      expect(albumsCollectionSpy.doc).toHaveBeenCalledWith('1');
      expect(docSpy.set).toHaveBeenCalledWith(album);
    });
  });


  describe('updateAlbum', () => {
    it('should update an existing album', () => {
      const album: Album = { id: '1', name: 'Updated Album', thumbnailUrl: 'test', category: ['test'] };
      const docSpy = jasmine.createSpyObj('AngularFirestoreDocument', ['update']);

      albumsCollectionSpy.doc.withArgs('1').and.returnValue(docSpy);
      docSpy.update.and.returnValue(Promise.resolve());

      service.updateAlbum('1', album);

      expect(albumsCollectionSpy.doc).toHaveBeenCalledWith('1');
      expect(docSpy.update).toHaveBeenCalledWith(album);
    });
  });
});
