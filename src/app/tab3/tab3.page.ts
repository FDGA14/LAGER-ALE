import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserInterface } from '../components/models/user';
import { PublicacionesService } from '../services/publicaciones.service';
import { Observable } from 'rxjs';
import { Publicacion } from '../components/models/publicacion';
import { comentario } from '../components/models/comentario';
import { UsersService } from '../services/users.service';
import { ModalController } from '@ionic/angular';
import { PublicacionComponent } from '../components/publicacion/publicacion.component';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { firestore } from 'firebase';
import { ActivatedRoute } from '@angular/router';
import { Following } from '../components/models/following';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  // public currentImage = '';
  public User: any = [];

  public publicaciones$: Observable<Publicacion[]>;

  public Publicaciones: any = [];
  public likes: any = [];

  heartType = 'heart-outline';
  postReference: AngularFirestoreDocument;
  publicacion: any;
  sub: any;
  postID: string;
  effect = '';
  public UID: string;

  public guest: string;

  following: any;
  usersFollow: any;
  elementUid: any;
  nregistros = [];
  nregistros1 = [];

  constructor(private authService: AuthService, private publicacionesSVC: PublicacionesService,
              private usersSVC: UsersService, private modal: ModalController, private afs: AngularFirestore,
              private route: ActivatedRoute, private userSvc: UsersService) {}

  ngOnInit(){
    // this.publicacionesSVC.getAllPublicaciones().subscribe(res => console.log('Post', res));
    // this.publicaciones$ = this.publicacionesSVC.getAllPublicaciones();


///////// INFORMACION DE USUARIO

   this.authService.userData$.subscribe(user => {
      this.User = user.displayName;
      // this.currentImage = user.photoURL;
      console.log('User=>', user);
    });

   this.authService.userData$.subscribe(user => {
      this.guest = user.email;
      // this.currentImage = user.photoURL;
      console.log('Guest=>', this.guest);
    });

   this.authService.userData$.subscribe(user => {
      this.UID = user.uid;
      // this.currentImage = user.photoURL;
      console.log('User UID de AuthService=>', this.UID);
    });

    ///////// INFORMACION DE PUBLICACIONES RS
   this.publicacionesSVC.getPublicaciones().subscribe(publicaciones => {
      this.Publicaciones = publicaciones;
      publicaciones.map(a => {
        this.postID = a.id;

        // console.log('LIKES', this.postID);
      });
    });

   this.publicacionesSVC.getPublicaciones().subscribe(publicaciones => {
      this.Publicaciones = publicaciones;
      for (const i in publicaciones) {
        this.nregistros1.push(publicaciones[i]);
              }
      console.log('PUBLICACIONES', this.nregistros1);
    });

   this.authService.userData$.subscribe(user => {
      this.UID = user.uid;
      console.log('User UID de AuthService=>', this.UID);
      this.userSvc.getUser(this.UID).subscribe((User: UserInterface) => {
        this.following = User.following;
      });
    });
   // console.log('UID de following', this.usersFollow);

   this.authService.userData$.subscribe(user => {
    this.UID = user.uid;
    console.log('User UID de AuthService=>', this.UID);
    this.userSvc.getUser(this.UID).subscribe((User: any) => {
      //console.log('User Logeado', User.following);
      // tslint:disable-next-line: forin
      for (const i in User.following) {
        this.nregistros.push(User.following[i].uid);
        console.log('PUBLICACIONES FOLLOWING', this.nregistros);
              }
    });
  });

  }



  openPublicacion(publicacion){
    this.modal.create({
      component: PublicacionComponent,
      componentProps: {
        name: publicacion.user,
        imagePublicacion: publicacion.imagePublicacion,
        descripcion: publicacion.descripcion,
        likes: publicacion.likes,
        chat: publicacion
      }
    }).then((modal) => modal.present());
  }

}
