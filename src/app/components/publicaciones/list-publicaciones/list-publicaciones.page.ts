import { Component, OnInit } from '@angular/core';
import { PublicacionesService } from '../../../services/publicaciones.service';
import { Publicacion } from '../../models/publicacion';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { ModalPublComponent } from '../modal-publ/modal-publ.component';
import { AuthService } from '../../../services/auth.service';
import { PublicacionComponent } from '../../publicacion/publicacion.component';
import { ModalController, AlertController } from '@ionic/angular';
import { Wishlist } from '../../models/wishlist';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { UsersService } from 'src/app/services/users.service';


@Component({
  selector: 'app-list-publicaciones',
  templateUrl: './list-publicaciones.page.html',
  styleUrls: ['./list-publicaciones.page.scss'],
})
export class ListPublicacionesPage implements OnInit {

  public publicaciones: any = [];
  public user: any = [];
  public userImage: any;
  public uid: any = [];
  status = '';

  text: string;
  imgurl: string;
  link: string;


  constructor(private publicacionesSVC: PublicacionesService,
              public Dialog: MatDialog,
              private authService: AuthService,
              private modal: ModalController,
              private alert: AlertController,
              private socialSharing: SocialSharing,
              private userSvc: UsersService) { }

  ngOnInit() {
    this.publicacionesSVC.getAllPublicaciones().subscribe(publicaciones => {
      console.log('publicaciones', publicaciones);
      this.publicaciones = publicaciones;
    });

    this.authService.userData$.subscribe(user => {
      this.uid = user.uid;
      this.userSvc.getUser(user.uid).subscribe(User => {
        this.user = User;
        console.log('UserInfo', this.user);
      });
    });
  }

  ShareGeneric(parameter){
    const url = this.link;
    const text = parameter + '\n';
    this.socialSharing.share(text, 'MEDIUM', null, url);
  }

  SendTwitter(favoritas: Publicacion){
    console.log(favoritas)
    this.imgurl = favoritas.imagePublicacion;
    console.log('favoritas.img', this.imgurl);
    this.text = favoritas.descripcion;
    this.socialSharing.shareViaTwitter(this.text, this.imgurl);
  }

  ShareFacebook(favoritas: Publicacion){
    this.imgurl = favoritas.imagePublicacion;
    console.log('favoritas.img', this.imgurl);
    this.text = favoritas.descripcion;
    this.socialSharing.shareViaFacebookWithPasteMessageHint(this.text, this.imgurl);
  }

  SendInstagram(favoritas: Publicacion){
    this.imgurl = favoritas.imagePublicacion;
    console.log('favoritas.img', this.imgurl);
    this.text = favoritas.descripcion;
    this.socialSharing.shareViaInstagram(this.text, this.imgurl);
  }

  onEditPublicacion(publicacion: Publicacion){
    console.log('Edit publicacion', publicacion);
    this.openDialog(publicacion);
  }

  deletePublicacion(publicacion: Publicacion){
    console.log('Delete cerveza', publicacion);
    this.alert.create({
      header: 'Deseas eliminar esta publicación?',
      subHeader: 'No podrás recuperar la publicación.',
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
            this.publicacionesSVC.deletePublicacion(publicacion);
          }
        }
      ]
    }).then((confirmElement) => {
      confirmElement.present();
    });
  }

onNewPublicacion(){
    // console.log('Nueva publicacion');
    this.openDialog();
  }

  openDialog(publicacion?: Publicacion): void {
    const config = {
      data: {
        message: publicacion ? 'Editar publicacion' : 'Nueva publicacion',
        content: publicacion
      }
    };
    const dialogRef = this.Dialog.open(ModalPublComponent, config);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result`, result);
    });
  }

  openPublicacion(Publicacion){
    this.modal.create({
      component: PublicacionComponent,
      componentProps: {
        name: Publicacion.user,
        imagePublicacion: Publicacion.imagePublicacion,
        descripcion: Publicacion.descripcion,
        likes: Publicacion.likes,
        chat: Publicacion
      }
    }).then((modal) => modal.present());
  }

}
