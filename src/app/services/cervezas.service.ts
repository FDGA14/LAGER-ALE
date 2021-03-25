import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { firestore } from 'firebase';
import { map, finalize } from 'rxjs/operators';
import { comentario } from '../components/models/comentario';
// import { CervezaInterface } from '../components/models/cerveza';
import { fileI } from '../components/models/files';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { Wishlist } from '../components/models/wishlist';
import { Likes } from '../components/models/likes';
import { Stores } from '../components/models/stores';
import { Search } from '../components/models/searchs';
import { Stars } from '../components/models/stars';



export interface cerveza {
  descripcion?: string;
  nombre?: string;
  id?: string;
  img?: any;
  precio?: string;
  cerveceria?: string;
  uid?: string;
  cervimg?: any;
  estilo?: string;
  volumen?: string;
  comentario?: string;
  porcentaje?: string;
  pais?: string;
  tipo?: string;
  todo?: any;
  reportImg?: any;
  reportEstilo?: any;
  reportInfo?: any;
  elaboracion?: any;
  fermentacion?: any;
  granos?: any;
}

@Injectable({
  providedIn: 'root'
})
export class CervezasService {

  private cervezas: AngularFirestoreCollection<cerveza>;
  private filePath: any;
  private dowloadURL: Observable<string>;

  constructor( private db: AngularFirestore, private storage: AngularFireStorage ) { 
    this.cervezas = db.collection <cerveza>('cervezas');
  }

  getCervezas(){
    return this.db.collection('cervezas').snapshotChanges().pipe(map(rooms => {
      return rooms.map(a => {
        const data = a.payload.doc.data() as cerveza;
        data.id = a.payload.doc.id;
        //console.log(data);
        return data;
      });
    }));
  }


  getChatRoom( chat_id: string){
    return this.db.collection('cervezas').doc(chat_id).valueChanges();
  }

  updateSearchToFirebase(search, chat_id: string){
    this.db.collection('cervezas').doc(chat_id).update({
      search: firestore.FieldValue.arrayUnion(search)
    });
  }

  sendStoresToFirebase(store: Stores, chat_id: string){
    this.db.collection('cervezas').doc(chat_id).update({
      stores: firestore.FieldValue.arrayUnion(store)
    });
  }

  deleteStoresToFirebase(store: Stores, chat_id: string){
    this.db.collection('cervezas').doc(chat_id).update({
      stores: firestore.FieldValue.arrayRemove(store)
    });
  }

  updateSearchs(search: Search, chat_id: string){
    this.db.collection('cervezas').doc(chat_id).update({
      searchs: firestore.FieldValue.arrayRemove(search)
    });
  }

  sendMsgToFirebase(message: comentario, chat_id: string){
    this.db.collection('cervezas').doc(chat_id).update({
      messages: firestore.FieldValue.arrayUnion(message),
    });
  }

  deleteMsgToFirebase(message: comentario, chat_id: string){
    this.db.collection('cervezas').doc(chat_id).update({
      messages: firestore.FieldValue.arrayRemove(message),
    });
  }

  sendAlertedToFirebase(alerted, chat_id: string){
    //console.log(this.db.collection('cervezas').doc(chat_id))
    this.db.collection('users').doc(chat_id).update({
      alerted: firestore.FieldValue.arrayUnion(alerted),
    });
  }

  sendAvanzadoToFirebase(avanzado, chat_id: string){
    //console.log(this.db.collection('cervezas').doc(chat_id))
    this.db.collection('users').doc(chat_id).update({
      avanzado: firestore.FieldValue.arrayUnion(avanzado),
    });
  }

  sendLikeMessageToFirebase(likes: Likes, chat_id: string){
    //console.log(this.db.collection('cervezas').doc(chat_id))
    this.db.collection('users').doc(chat_id).update({
      likes: firestore.FieldValue.arrayUnion(likes),
    });
  }

  sendLikeDadoMessageToFirebase(likes: Likes, chat_id: string){
    //console.log(this.db.collection('cervezas').doc(chat_id))
    this.db.collection('users').doc(chat_id).update({
      likesDados: firestore.FieldValue.arrayUnion(likes),
    });
  }

  deleteLikeToFirebase(like: Likes, chat_id: string){
    //console.log(this.db.collection('cervezas').doc(chat_id))
    this.db.collection('users').doc(chat_id).update({
      likes: firestore.FieldValue.arrayRemove(like),
    });
  }

  sendWishlistToFirebase(whishlist: Wishlist, chat_id: string){
    this.db.collection('users').doc(chat_id).update({
      wishlist: firestore.FieldValue.arrayUnion(whishlist)
    });
  }

  sendFavoritaToFirebase(whishlist: Wishlist, chat_id: string){
    this.db.collection('users').doc(chat_id).update({
      favoritas: firestore.FieldValue.arrayUnion(whishlist)
    });
  }

  sendStarsToFirebase(stars, chat_id: string){
    this.db.collection('cervezas').doc(chat_id).update({
      stars: firestore.FieldValue.arrayUnion(stars),
    });
  }

  sendReportInfoToFirebase(report, chat_id: string){
    this.db.collection('cervezas').doc(chat_id).update({
      reportInfo: firestore.FieldValue.arrayUnion(report),
    });
  }

  sendReportImgToFirebase(report, chat_id: string){
    this.db.collection('cervezas').doc(chat_id).update({
      reportImg: firestore.FieldValue.arrayUnion(report),
    });
  }

  sendReportEstiloToFirebase(report, chat_id: string){
    this.db.collection('cervezas').doc(chat_id).update({
      reportEstilo: firestore.FieldValue.arrayUnion(report),
    });
  }

  sendDeleteCervezaByReportToFirebase(chat_id: string){
    this.db.collection('cervezas').doc(chat_id).delete();
  }

  sendComentadaToFirebase(comentada: Wishlist, chat_id: string){
    this.db.collection('users').doc(chat_id).update({
      comentada: firestore.FieldValue.arrayUnion(comentada),
    });
  }

  sendRangeVal1ToFirebase(rangeVal1, chat_id: string){
    this.db.collection('cervezas').doc(chat_id).update({
      rangeVal1: firestore.FieldValue.arrayUnion(rangeVal1),
    });
  }

  sendRangeVal2ToFirebase(rangeVal2, chat_id: string){
    this.db.collection('cervezas').doc(chat_id).update({
      rangeVal2: firestore.FieldValue.arrayUnion(rangeVal2),
    });
  }

  sendRangeVal3ToFirebase(rangeVal3, chat_id: string){
    this.db.collection('cervezas').doc(chat_id).update({
      rangeVal3: firestore.FieldValue.arrayUnion(rangeVal3),
    });
  }

  sendRangeVal4ToFirebase(rangeVal4, chat_id: string){
    this.db.collection('cervezas').doc(chat_id).update({
      rangeVal4: firestore.FieldValue.arrayUnion(rangeVal4),
    });
  }

  public deleteCerveza(cerveza: cerveza){
    return this.cervezas.doc(cerveza.id).delete();
  }

  public editCerveza(cerveza: cerveza, newImage?: fileI){
    if (newImage){
      this.uploadImage(cerveza, newImage);
    } else {
    return this.cervezas.doc(cerveza.id).update(cerveza);
    }
  }

  public preAddAndUpdatePost(cerveza: cerveza, image: fileI): void{
    this.uploadImage(cerveza, image);
  }

  private savePost(post: cerveza){
    console.log('CervezasSvc', post);
    const postObj = {
      nombre: post.nombre,
      descripcion: post.descripcion,
      cerveceria: post.cerveceria,
      uid: post.uid,
      img: this.dowloadURL,
      precio: post.precio,
      estilo: post.estilo,
      volumen: post.volumen,
      fileRef: this.filePath,
      pais: post.pais,
      porcentaje: post.porcentaje,
      tipo: post.tipo,
      elaboracion: post.elaboracion,
      fermentacion: post.fermentacion,
      granos: post.granos,
    };
    if (post.id){
      return this.cervezas.doc(post.id).update(postObj);
    } else {
      return this.cervezas.add(postObj);
    }
  }

  private uploadImage(cerveza: cerveza, image: fileI) {
    this.filePath = `images/${image.name}`;
    const fileRef = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, image);
    task.snapshotChanges().pipe(
      finalize(() =>{
        fileRef.getDownloadURL().subscribe(urlImage => {
          this.dowloadURL = urlImage,
          console.log('url image', urlImage);
          console.log('cerveza', cerveza);
          this.savePost(cerveza);
        });
      })
    ).subscribe();
  }

}
