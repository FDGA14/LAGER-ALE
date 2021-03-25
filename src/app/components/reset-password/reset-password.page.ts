import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {

  public email = '';

  constructor( private authService: AuthService ) { }

  ngOnInit() {
  }

  sendLinkReset(){
    if (this.email !== '') {
      this.authService.resetPassword(this.email).then(() => {
        console.log('enviado');
      }).catch(() => {
        console.log('error');
      });
    } else {
      alert('Ingresar un correo registrado');
    }

  }
}
