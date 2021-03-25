import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';
import { Following } from '../models/following';
import { userInfo } from 'os';

@Component({
  selector: 'app-following',
  templateUrl: './following.page.html',
  styleUrls: ['./following.page.scss'],
})
export class FollowingPage implements OnInit {

  userInfo: any = [];
  Uid: any = [];

  constructor(private userSvc: UsersService, public authService: AuthService, public alert: AlertController) { }

  ngOnInit() {
    this.authService.userData$.subscribe(user => {
      this.Uid = user.uid;
      this.userSvc.getUser(user.uid).subscribe(User => {
        this.userInfo = User;
        console.log('UserInfo', this.userInfo.following);
      });
    });
  }

  unfollow(following: Following){
    console.log('Dejar de seguir', following);
    const fllwing: Following = {
      uid: following.uid,
      descripcion: following.descripcion,
      displayName: following.displayName,
      photoURL: following.photoURL
    };
    this.showAlert('Unfollow', 'Dejaste de seguir al usuario.');
    this.userSvc.unfollow(fllwing, this.Uid);
    const follower = {
      uid: this.userInfo.uid,
      descripcion: this.userInfo.descripcion,
      displayName: this.userInfo.displayName,
      photoURL: this.userInfo.photoURL
    }
    this.userSvc.unfollowUser(follower, following.uid);
    console.log(follower)
    console.log('Deleted following');
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
