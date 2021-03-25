import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Publicacion } from '../components/models/publicacion';
import { map, finalize } from 'rxjs/operators';
import { fileI } from '../components/models/files';
import { AngularFireStorage } from '@angular/fire/storage';
import { AuthService } from './auth.service';
import { comentario } from '../components/models/comentario';
import { firestore } from 'firebase';
import { Follower } from '../components/models/follower';

@Injectable({
  providedIn: 'root'
})
export class PublicacionesService {

  public user: any = [];
  private publicacionesCollection: AngularFirestoreCollection<Publicacion>;
  private filePath: any;
  private downloadURL: Observable<string>;

  constructor(private afs: AngularFirestore, private storage: AngularFireStorage, private authService: AuthService) {
    this.publicacionesCollection = afs.collection<Publicacion>('publicaciones');
  }

  public getAllPublicaciones(): Observable<Publicacion[]>{
    return this.publicacionesCollection.snapshotChanges().pipe(map(actions =>
      actions.map(a => {
        const data = a.payload.doc.data() as Publicacion;
        const id = a.payload.doc.id;
        return {id, ... data};
      })));
  }

  //Robot solar
  getPublicaciones(){
    return this.afs.collection('publicaciones').snapshotChanges().pipe(map(publicaciones => {
      return publicaciones.map(a => {
        const data = a.payload.doc.data() as Publicacion;
        data.id = a.payload.doc.id;
        return data;
      });
    }));
  }

  getChatRoom(chat_id: string){
    return this.afs.collection('publicaciones').doc(chat_id).valueChanges();
  }

  sendLikeToFirebase(like, chat_id: string){
    this.afs.collection('publicaciones').doc(chat_id).update({
      likes: firestore.FieldValue.arrayUnion(like),
    });
  }
  sendDislikeToFirebase(like, chat_id: string){
    this.afs.collection('publicaciones').doc(chat_id).update({
      likes: firestore.FieldValue.arrayRemove(like),
    });
  }

  sendMsgToFirebase(message: comentario, chat_id: string){
    this.afs.collection('publicaciones').doc(chat_id).update({
      messages: firestore.FieldValue.arrayUnion(message),
    });
  }

  deleteMsgToFirebase(message: comentario, chat_id: string){
    this.afs.collection('publicaciones').doc(chat_id).update({
      messages: firestore.FieldValue.arrayRemove(message),
    });
  }

  sendFollowToFirebase(following: Follower, chat_id: string){
    this.afs.collection('users').doc(chat_id).update({
      following: firestore.FieldValue.arrayUnion(following),
    });
  }

  sendUnfollowToFirebase(following: Follower, chat_id: string){
    this.afs.collection('users').doc(chat_id).update({
      following: firestore.FieldValue.arrayRemove(following),
    });
  }
    sendFollowerToFirebase(follower: Follower, chat_id: string){
      this.afs.collection('users').doc(chat_id).update({
        followers: firestore.FieldValue.arrayUnion(follower),
      });
    }

      sendUnfollowerToFirebase(follower: Follower, chat_id: string){
        this.afs.collection('users').doc(chat_id).update({
          followers: firestore.FieldValue.arrayRemove(follower),
        });
      }
/////////////////////////////
  public deletePublicacion(publicacion: Publicacion){
    return this.publicacionesCollection.doc(publicacion.id).delete();
  }

  public editPublicacion(publicacion: Publicacion, newImage?: fileI){
    if(newImage) {
      this.uploadImage(publicacion, newImage);
    } else {
    return this.publicacionesCollection.doc(publicacion.id).update(publicacion);
    }
  }

  public preAddAndUpdatePublicacion(publicacion: Publicacion, image: fileI){
    this.uploadImage(publicacion, image);
  }

  private uploadImage(publicacion: Publicacion, image: fileI){
    this.filePath = `publicaciones/${image.name}`;
    const fileRef = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, image);
    task.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe(urlImage => {
          this.downloadURL = urlImage;
          //console.log('URL IMAGE', urlImage);
          //console.log('Publicacion', publicacion);
          this.savePublicacion(publicacion);
        });
      })
      ).subscribe();
  }

  private savePublicacion(publicacion: Publicacion){
    const publicacionObj = {
      descripcion: publicacion.descripcion,
      user: publicacion.user,
      imagePublicacion: this.downloadURL,
      fileRef: this.filePath,
      uid: publicacion.uid,
    };
    this.publicacionesCollection.add(publicacionObj);
  }

}
