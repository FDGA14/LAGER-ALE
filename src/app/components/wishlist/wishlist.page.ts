import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';
import { CervezaComponent } from '../cerveza/cerveza.component';
import { Wishlist } from '../models/wishlist';
import { cerveza } from '../../services/cervezas.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.page.html',
  styleUrls: ['./wishlist.page.scss'],
})
export class WishlistPage implements OnInit {

  public users: any = [];
  public uid: string;
  public userInfo: any = [];
  public wishlists: any = [];
  public wishlist: any = [];
  status = '';


  constructor(public authService: AuthService,
              private userSvc: UsersService,
              public alert: AlertController,
              private modal: ModalController,
              ) { }

  ngOnInit() {
    this.userSvc.getUsuarios().subscribe(users => {
      this.users = users;
      console.log('Users', this.users);
    });

    this.authService.userData$.subscribe(user => {
      this.uid = user.uid;
      console.log('User UID', this.uid);
      this.userSvc.getUser(user.uid).subscribe(User => {
        this.userInfo = User;
        console.log('UserInfo', this.userInfo);
        this.wishlists = this.userInfo.wishlist;
        console.log('Wishlist', this.wishlists);
      });
      });
  }

  openCerveza(cerveza: cerveza){
    this.modal.create({
      component: CervezaComponent,
      componentProps: {
        nombre: cerveza.nombre,
        img: cerveza.img,
        cervimg: cerveza.cervimg,
        cerveceria: cerveza.cerveceria,
        precio: cerveza.precio,
        estilo: cerveza.estilo,
        volumen: cerveza.volumen,
        descripcion: cerveza.descripcion,
        chat: cerveza,
        pais: cerveza.pais,
      }
    }).then((modal) => modal.present());
  }

  deleteWishlist(wishlist: Wishlist){
    console.log('Delete cerveza', wishlist);
    const wish = wishlist;
    this.alert.create({
      header: 'Deseas eliminar esta cerveza de tu wishlist?',
      subHeader: '',
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
            this.userSvc.deleteWishlist(wish, this.uid);
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
