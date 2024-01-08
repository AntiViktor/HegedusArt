import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Image } from '../models/Image';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { map, switchMap } from 'rxjs/operators';
import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  collectionName = 'Images';

  constructor(
    private afs: AngularFirestore,
    private storage: AngularFireStorage    
    ) { }

  loadImageMeta(): Observable<Array<Image>> {
    return this.afs.collection<Image>(this.collectionName).valueChanges();
  }

  loadImage(imageUrl: string) {
    return this.storage.ref(imageUrl).getDownloadURL();
  }

  getImagesByProductId(productId: string): Observable<Image[]> {
    return this.afs
      .collection<Image>('Images', (ref) => ref.where('product_id', '==', productId))
      .snapshotChanges()
      .pipe(
        switchMap((snaps) => {
          return forkJoin(
            snaps.map((snap) => {
              const data = snap.payload.doc.data() as Image;
              const id = snap.payload.doc.id;

              return this.storage.ref(data.download_url).getDownloadURL().pipe(
                map((url) => ({ ...data, image_url: url }))
              );
            })
          );
        })
      );
  }
}