import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { AuthService } from '../../services/auth.service';
import { UserInterface } from '../models/user';
import { ModalController } from '@ionic/angular';
import { UserComponent } from '../user/user.component';
import { PublicacionesService } from 'src/app/services/publicaciones.service';



@Component({
  selector: 'app-find-users',
  templateUrl: './find-users.page.html',
  styleUrls: ['./find-users.page.scss'],
})
export class FindUsersPage implements OnInit {

  public users: any = [];

  public displayName: string;
  public uid: string;

  public chatRoom: any = [];

  textoBuscar = '';

  constructor(private userSvc: UsersService, private authSvc: AuthService, private modal: ModalController,
              private authService: AuthService, private publicacionesSvc: PublicacionesService) { }

  ngOnInit() {
    this.userSvc.getUsuarios().subscribe(users => {
      this.users = users;
    });

    this.publicacionesSvc.getPublicaciones().subscribe(chats => {
      this.chatRoom = chats;
    });

    this.authService.userData$.subscribe(user => {
      this.displayName = user.displayName;
      this.uid = user.uid;
      console.log('User displayName=>', user.displayName);
      });
  }

  openUser(chat){
    this.modal.create({
      component: UserComponent,
      componentProps: {
        displayName: chat.displayName,
        photoURL: chat.photoURL,
        descripcion: chat.descripcion,
        uid: chat.uid,
        followers: chat.followers,
        following: chat.following,
        publicacionesFollowing: chat.publicaciones,
        chat
      }
    }).then( (modal) => modal.present());
  }

  onSearchChange(event){
    console.log(event);
    this.textoBuscar = event.detail.value;
  }

}
