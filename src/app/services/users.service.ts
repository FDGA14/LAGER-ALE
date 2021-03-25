import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { finalize, map } from 'rxjs/operators';
import { UserInterface } from '../components/models/user';
import { Observable } from 'rxjs';
import { fileI } from '../components/models/files';
import { AngularFireStorage } from '@angular/fire/storage';
import { Wishlist } from '../components/models/wishlist';
import { firestore } from 'firebase';
import { Scan } from '../components/models/scan';
import { Following } from '../components/models/following';
import { Stores } from '../components/models/stores';



@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private user: UserInterface;
  private usersCollection: AngularFirestoreCollection<UserInterface>;
  private filePath: any;
  private downloadURL: Observable<string>;

  constructor(private db: AngularFirestore, private storage: AngularFireStorage) {
    this.usersCollection = db.collection<UserInterface>('users');
  }

  getUsuarios(){
    return this.db.collection('users').snapshotChanges().pipe(map(users => {
      return users.map(a => {
        const data = a.payload.doc.data() as UserInterface;
        data.id = a.payload.doc.id;
        return data;
      });
    }));
  }

  getUser(chat_id: string){
    return this.db.collection('users').doc(chat_id).valueChanges();
  }

  getUID(): string {
    return this.user.uid;
}

sendEventToFirebase(evento, chat_id: string){
  this.db.collection('users').doc(chat_id).update({
    eventos: firestore.FieldValue.arrayUnion(evento)
  });
}

sendUserCervToFirebase(cerv, chat_id: string){
  this.db.collection('users').doc(chat_id).update({
    cerv: firestore.FieldValue.arrayUnion(cerv)
  });
}

deleteUserToFirebase(chat_id: string){
  this.db.collection('users').doc(chat_id).delete();
}

sendScanToFirebase(scan: Scan, chat_id: string){
  this.db.collection('users').doc(chat_id).update({
    scans: firestore.FieldValue.arrayUnion(scan)
  });
}

sendPublicacionToFirebase(data, chat_id: string){
  this.db.collection('users').doc(chat_id).update({
    publicaciones: firestore.FieldValue.arrayUnion(data)
  });
}

sendCervCalToFirebase(CervCal, chat_id: string){
  this.db.collection('users').doc(chat_id).update({
    cervCal: firestore.FieldValue.arrayUnion(CervCal)
  });
}

deleteScan(scan: Scan, chat_id: string){
  this.db.collection('users').doc(chat_id).update({
    scans: firestore.FieldValue.arrayRemove(scan),
  });
}

deleteWishlist(wishlist: Wishlist, chat_id: string){
  this.db.collection('users').doc(chat_id).update({
    wishlist: firestore.FieldValue.arrayRemove(wishlist),
  });
}


deleteFavorita(favoritas: Wishlist, chat_id: string){
  this.db.collection('users').doc(chat_id).update({
    favoritas: firestore.FieldValue.arrayRemove(favoritas),
  });
}

unfollow(following: Following, chat_id: string){
  this.db.collection('users').doc(chat_id).update({
    following: firestore.FieldValue.arrayRemove(following),
  });
}

unfollowUser(follower: Following, chat_id: string){
  this.db.collection('users').doc(chat_id).update({
    followers: firestore.FieldValue.arrayRemove(follower),
  });
}

public editUser(user: UserInterface, newImage?: fileI){
  if (newImage){
    this.uploadImage(user, newImage);
  } else {
    return this.usersCollection.doc(user.id).update(user);
  }
}

private uploadImage(user: UserInterface, image: fileI){
  this.filePath = `users/${image.name}`;
  const fileRef = this.storage.ref(this.filePath);
  const task = this.storage.upload(this.filePath, image);
  task.snapshotChanges().pipe(
    finalize(() => {
      fileRef.getDownloadURL().subscribe(urlImage => {
        this.downloadURL = urlImage;
        console.log('URL IMAGE', urlImage);
        this.saveUser(user);
      });
    })
    ).subscribe();
}

private saveUser(user: UserInterface){
  console.log('UserSvc', user);
  const userObj = {
    descripcion: user.descripcion,
    id: user.id,
    photoURL: this.downloadURL,
    fileRef: this.filePath,
    displayName: user.displayName,
    peso: user.peso
  };
  if (user.id){
    return this.usersCollection.doc(user.id).update(userObj);
  } else {
    return this.usersCollection.add(userObj);
  }
}

}
