import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController, AlertController } from '@ionic/angular';
import { comentario } from '../models/comentario';
import { PublicacionesService } from '../../services/publicaciones.service';
import { AuthService } from '../../services/auth.service';
import { firestore } from 'firebase';
import { Publicacion } from '../models/publicacion';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

@Component({
  selector: 'app-publicacion',
  templateUrl: './publicacion.component.html',
  styleUrls: ['./publicacion.component.scss'],
})
export class PublicacionComponent implements OnInit {

  public name: string;
  public descripcion: string;
  public imagePublicacion: string;
  public displayName: string;
  public likes;


  //
  public messages = ['Mensaje1', 'Mensaje2'];
  public message: comentario;
  public chat: any;
  public room: any;
  public msg: string;

  //
  heartType = 'heart';
  public user: string;
  Publicacion;
	effect = '';
	post;
	postReference: AngularFirestoreDocument;
  sub;
  postID: string;
  status = '';
  likeComentario: any;

  constructor(private authService: AuthService,
              private navParams: NavParams,
              private modal: ModalController,
              private publicacionesSVC: PublicacionesService,
              private afs: AngularFirestore,
              private alert: AlertController,
              ) { }

  ngOnInit() {
    this.name = this.navParams.get('name');
    this.descripcion = this.navParams.get('descripcion');
    this.imagePublicacion = this.navParams.get('imagePublicacion');
    this.likes = this.navParams.get('likes');
    this.chat = this.navParams.get('chat');

    this.likes = this.likes?.length;

    this.publicacionesSVC.getChatRoom(this.chat.id).subscribe(room => {
      this.room = room;
      console.log('Room', room);

    });
/**
    this.publicacionesSVC.getChatRoom(this.chat.id).subscribe(publicacion =>{
      this.Publicacion = publicacion;
      console.log('Room', this.Publicacion)
    });
*/

    this.authService.userData$.subscribe(user => {
      this.displayName = user.displayName;
      this.user = user.uid;
      console.log('User displayName=>', user.displayName);
      console.log('User UID=>', user.uid);
      });

      // tslint:disable-next-line: align
      //this.postID = this.chat.id;
		  //this.postReference = this.afs.doc(`publicaciones/${this.postID}`);
		  //this.sub = this.postReference.valueChanges().subscribe(val => {
        //console.log('VAL', val);
			     //this.post = val;
			     //this.effect = val.effect;
			     //this.heartType = val.likes.includes(this.user) ? 'heart' : 'heart-outline';
    //});

  }

  updateLike(publicacion){
    console.log(publicacion?.likes);
    this.likeComentario = publicacion?.likes;
    const funciona = false
    if (!publicacion?.likes) {
      console.log('JALA');
      this.likeComentario = ['RPU'];
    }
    //console.log(publicacion.id);
    //console.log(publicacion.uid);
    if (this.likeComentario.includes(this.user)) {
      this.heartType = 'heart';
      console.log(this.heartType);
      this.showAlert('Ya diste like a la publicación', '');
    } else {
      this.heartType = 'heart';
      console.log(this.heartType);
      this.publicacionesSVC.sendLikeToFirebase(this.user, publicacion.id);
    }
  }

  closeChat(){
    this.modal.dismiss();
  }

  async sendMessage(){
    const mensaje: comentario = {
      content: this.msg,
      type: 'text',
      date: new Date(),
      displayName: this.displayName,
      UID: this.user
    };

    this.publicacionesSVC.sendMsgToFirebase(mensaje, this.chat.id);
    this.msg = '';
  }

  //ngOnDestroy() {
		//this.sub.unsubscribe();
	//}

  //toggleHeart() {
		//if (this.heartType === 'heart-outline') {
			//this.postReference.update({
				//likes: firestore.FieldValue.arrayUnion(this.user)
			//});
		//} else {
			//this.postReference.update({
				//likes: firestore.FieldValue.arrayRemove(this.user)
			//});
		//}
  //}
  
  deleteComentario(comentario: comentario){
    console.log('Comentario', comentario);
    this.alert.create({
      header: 'Deseas eliminar este comentario?',
      subHeader: 'No podrás recuperar la información de este.',
      buttons: [
        {
          text: 'Cancelar',
          handler: (data) => {
            this.status = 'Cancelado';
          }
        },
        {
          text: 'Ok',
          handler: (data) => {
            this.status = 'Eliminada';
            this.publicacionesSVC.deleteMsgToFirebase(comentario, this.chat.id);
          }
        }
      ]
    }).then((confirmElement) => {
      confirmElement.present();
    });
  }

  async showAlert(header: string, message: string){
    const alert = this.alert.create({
      header,
      message,
      buttons: ['Ok']
    });
    await  (await alert).present();
  }

}
