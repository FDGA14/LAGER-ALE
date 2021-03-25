import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController, AlertController } from '@ionic/angular';
import { PublicacionesService } from 'src/app/services/publicaciones.service';
import { UsersService } from 'src/app/services/users.service';
import { comentario } from '../models/comentario';
import { PublicacionComponent } from '../publicacion/publicacion.component';
import { Publicacion } from '../models/publicacion';
import { AuthService } from 'src/app/services/auth.service';
import { Follower } from '../models/follower';
import { Following } from '../models/following';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { firestore } from 'firebase';
import { CervezaComponent } from '../cerveza/cerveza.component';
import { FollowersModalComponent } from '../followers-modal/followers-modal.component';
import { FollowingModalComponent } from '../following-modal/following-modal.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {

  public displayName: string;
  public photoURL: string;
  public descripcion: string;
  public uid: string;

  public UiD: string;

  public Uid: string;
  public DisplayName: string;
  public PhotoURL: any;
  public Descripcion: string;

  public followers: any;
  public following: any;
  followingLength: any;
  followersLength: any;

  public users: any = [];

  public publicaciones: any = [];

  ////// ROBOTSOLAR CHAT
  public mensajes = ['Mensaje1', 'Mensaje2'];
  public message: comentario;
  public chat: any;
  public room: any;

  User: string;

  public userInfo: any = [];
  public publicacionesFollowing: any = [];

  heartType = 'heart';
  likeComentario: any = [];
  cervezaCalificada: any = [];
  cervezaComentada: any = [];
  public showDetails = false;
  public showDetails1 = false;
  followersUser: any = [];

  constructor(private navParams: NavParams,
              private modal: ModalController,
              private modal1: ModalController,
              private userSvc: UsersService,
              private publicacionesSVC: PublicacionesService,
              public authService: AuthService,
              public alert: AlertController,
              private afs: AngularFirestore,
              ) { }

  ngOnInit() {
    this.displayName = this.navParams.get('displayName');
    this.photoURL = this.navParams.get('photoURL');
    this.descripcion = this.navParams.get('descripcion');
    this.uid = this.navParams.get('uid');
    this.chat = this.navParams.get('chat');
    this.followers = this.navParams.get('followers');
    this.following = this.navParams.get('following');
    this.publicacionesFollowing = this.navParams.get('publicaciones');

    console.log(this.chat);
    for (const i in this.chat.followers) {
      this.followersUser.push(this.chat.followers[i].uid);
            }
    console.log('Followers', this.followersUser);

    for (const i in this.chat.cervCal) {
      this.cervezaCalificada.push(this.chat.cervCal[i].cerveza);
            }
    console.log('Arreglo de nombres de tiendas', this.cervezaCalificada);

    for (const i in this.chat.comentada) {
      this.cervezaComentada.push(this.chat.comentada[i]);
            }
    console.log('Arreglo de nombres de tiendas1', this.cervezaComentada);

    this.authService.userData$.subscribe(user => {
      console.log('User=>', user.displayName);
      this.User = user.displayName;
    });

    this.userSvc.getUsuarios().subscribe(users => {
      this.users = users;
    });

    this.publicacionesSVC.getAllPublicaciones().subscribe(publicaciones => {
      console.log('publicaciones', publicaciones);
      this.publicaciones = publicaciones;
    });

    this.publicacionesSVC.getChatRoom(this.chat.id).subscribe(room => {
      // console.log('RS', room);
    });

    this.authService.userData$.subscribe(user => {
      this.Uid = user.uid;
      this.userSvc.getUser(user.uid).subscribe((User: Following) => {
        this.PhotoURL = User.photoURL ;
        console.log('UserInfo PhotoURL', this.PhotoURL);
      });
    });

    this.authService.userData$.subscribe(user => {
      this.Uid = user.uid;
      this.userSvc.getUser(user.uid).subscribe((User: Following) => {
        this.Descripcion = User.descripcion;
        console.log('UserInfo descripcion', this.Descripcion);
      });
    });

    this.authService.userData$.subscribe(user => {
      this.Uid = user.uid;
      this.userSvc.getUser(user.uid).subscribe((User: Following) => {
        this.DisplayName = User.displayName;
        console.log('UserInfo displayName', this.DisplayName);
      });
    });

    this.authService.userData$.subscribe(user => {
      this.Uid = user.uid;
      this.userSvc.getUser(user.uid).subscribe((User: Following) => {
        this.Uid = User.uid;
        console.log('UserInfo UID', this.Uid);
      });
    });

    this.authService.userData$.subscribe(user => {
      this.Uid = user.uid;
      this.userSvc.getUser(user.uid).subscribe(User => {
        this.userInfo = User;
        console.log('UserInfo', this.userInfo);
      });
    });

  }

  openFollowers(followers){
    console.log(followers);
      this.modal1.create({
        component: FollowersModalComponent,
        componentProps: {
          followers: followers
        }
      }).then((modal) => modal.present());
  }

  openFollowing(following){
    console.log(following);
    this.modal1.create({
      component: FollowingModalComponent,
      componentProps: {
        following: following
      }
    }).then((modal) => modal.present());
  }

  updateLike(publicacion){
    for (const i in publicacion.likes) {
      this.likeComentario.push(publicacion.likes[i]);
            }
    console.log('Arreglo de nombres de tiendas', this.likeComentario);
    console.log(publicacion);
    console.log(publicacion.id);
    console.log(this.Uid);
    if (this.likeComentario.includes(this.Uid)) {
      this.heartType = 'heart';
      console.log(this.heartType);
      this.showAlert('Ya diste like a la publicación', '');
    } else {
      this.heartType = 'heart';
      console.log(this.heartType);
      this.publicacionesSVC.sendLikeToFirebase(this.Uid, publicacion.id);
      this.showAlert('Like', '');
    }
  }

  async follow(){
    const following: Follower = {
      uid: this.uid,
      photoURL: this.photoURL,
      descripcion: this.descripcion,
      displayName: this.displayName,
    };
    const follower: Follower = {
      uid: this.Uid,
      photoURL: this.PhotoURL,
      descripcion: this.Descripcion,
      displayName: this.DisplayName,
    };
    this.publicacionesSVC.sendFollowToFirebase(following, this.Uid);
    this.publicacionesSVC.sendFollowerToFirebase(follower, this.uid);
    // console.log('Seguidor', follower);
    console.log('Siguiendo', following);
    this.showAlert('Empezaste a seguir a este usuario.', 'Ya podras ver las publicaciones del usuario en el modulo social');
  }

  async showAlert(header: string, message: string){
    const alert = this.alert.create({
      header,
      message,
      buttons: ['Ok']
    });
    await  (await alert).present();
  }

  toggleDetails() {
    this.showDetails = !this.showDetails;
 }

 toggleDetails1() {
  this.showDetails1 = !this.showDetails1;
}

  closeChat(){
    this.modal.dismiss();
  }

}
