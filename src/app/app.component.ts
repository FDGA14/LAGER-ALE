import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit{

  public cerveceria: any = [];
  public guest: string;
  public Uid: string;
  public userInfo: any = [];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public authService: AuthService,
    private userSvc: UsersService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  Onlogout(){
    this.authService.logout();
  }
  
  ngOnInit (){
    this.authService.userData$.subscribe(user =>{
      // tslint:disable-next-line: no-unused-expression
      this.cerveceria = user.uid;
      console.log('User=>', this.cerveceria);
    });

    this.authService.userData$.subscribe(user => {
      this.guest = user.email;
      // this.currentImage = user.photoURL;
      console.log('Guest=>', this.guest);
    });

    this.authService.userData$.subscribe(user => {
      this.Uid = user.uid;
      this.userSvc.getUser(user.uid).subscribe(User => {
        this.userInfo = User;
        //console.log('UserInfo', this.userInfo);
      });
    });
  }

}
