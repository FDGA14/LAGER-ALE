import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string;
  password: string;

  constructor( private authService: AuthService, public router: Router, public alert: AlertController,
               private afAuth: AngularFireAuth ) { }

  ngOnInit() {
  }

  onSubmitLogin(){
    this.authService.login(this.email, this.password).then(res => {
        this.router.navigate(['/tabs/tab2']).then(() => {
          window.location.reload();
        });
    }).catch(err => alert('Los datos son incorrectos o no existe el usuario'));
  }

  signinAnonymously() {
    this.afAuth.signInAnonymously().then((userCredential) => {
      console.log(userCredential);
      this.router.navigate(['/tabs/tab2']).then(() => {
        window.location.reload();
      });
  }).catch(err => alert('Los datos son incorrectos o no existe el usuario'));
}


}
