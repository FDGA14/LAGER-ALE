import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';
import { Wishlist } from '../models/wishlist';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-favoritas',
  templateUrl: './favoritas.page.html',
  styleUrls: ['./favoritas.page.scss'],
})
export class FavoritasPage implements OnInit {

  text: string;
  imgurl: string;
  link: string;

  public users: any = [];
  public uid: string;

  constructor(public authService: AuthService,
              private userSvc: UsersService,
              private socialSharing: SocialSharing,
              public alert: AlertController) { }

  ngOnInit() {
    this.userSvc.getUsuarios().subscribe(users => {
      this.users = users;
      console.log('Users', this.users);
    });

    this.authService.userData$.subscribe(user => {
      this.uid = user.uid;
      console.log('User UID', this.uid);
      });
  }

  ShareGeneric(parameter){
    const url = this.link;
    const text = parameter + '\n';
    this.socialSharing.share(text, 'MEDIUM', null, url);
  }

  SendTwitter(favoritas: Wishlist){
    this.imgurl = favoritas.img;
    console.log('favoritas.img', this.imgurl);
    this.text = favoritas.descripcion + ' ' + 'Esta y muchas cervezas mas disponibles en Lager & Ale.';
    console.log('Text', this.text);
    this.socialSharing.shareViaTwitter(this.text, null, this.imgurl).then(() => {
    }).catch(() => {
      this.showAlert('Error al compartir', 'Para compartir el contenido es necesario tener la aplicaion instalada en el dispositivo movil')
    });
  }

  ShareFacebook(favoritas: Wishlist){
    this.imgurl = favoritas.img;
    console.log('favoritas.img', this.imgurl);
    this.text = favoritas.descripcion + ' ' + 'Esta y muchas cervezas mas disponibles en Lager & Ale.';
    console.log('Text', this.text);
    this.socialSharing.shareViaFacebookWithPasteMessageHint(this.text, null, this.imgurl, null).then(() => {
    }).catch(() => {
      this.showAlert('Error al compartir', 'Para compartir el contenido es necesario tener la aplicaion instalada en el dispositivo movil')
    });
  }

  SendInstagram(favoritas: Wishlist){
    this.imgurl = favoritas.img;
    console.log('favoritas.img', this.imgurl);
    this.text = this.imgurl + '' + favoritas.descripcion + ' ' + 'Esta y muchas cervezas mas disponibles en Lager & Ale.';
    console.log('Text', this.text);
    this.socialSharing.shareViaInstagram(this.text, this.imgurl).then(() => {
    }).catch(() => {
      this.showAlert('Error al compartir', 'Para compartir el contenido es necesario tener la aplicaion instalada en el dispositivo movil')
    });
  }

  async deleteFavoritas(favoritas: Wishlist){
    console.log('Delete wishlist', favoritas);
    const favorita: Wishlist = {
      uid: favoritas.uid,
      user: favoritas.user,
      cerveceria: favoritas.cerveceria,
      cerveza: favoritas.cerveza,
      img: favoritas.img,
      descripcion: favoritas.descripcion,
      estilo: favoritas.estilo
    };
    this.showAlert('Eliminada', 'Cerveza eliminada de favoritos.');
    console.log('Deleted wishlist', favorita);
    this.userSvc.deleteFavorita(favorita, this.uid);
    // console.log('Deleted wishlist');
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
