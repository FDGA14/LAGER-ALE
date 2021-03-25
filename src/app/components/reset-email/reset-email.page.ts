import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-reset-email',
  templateUrl: './reset-email.page.html',
  styleUrls: ['./reset-email.page.scss'],
})
export class ResetEmailPage implements OnInit {

  public emailNew = '';
  public email = '';
  public password = '';
  public userInfo: any;

  constructor(private authService: AuthService,
              private userSvc: UsersService) { }

  ngOnInit() {
    this.authService.userData$.subscribe(user => {
      console.log('USER=>', user);
      this.email = user.email;
      this.userSvc.getUser(user.uid).subscribe(User => {
        this.userInfo = User;
        console.log('UserInfo', this.userInfo);
        this.password = this.userInfo.password;
      });
    });
  }

  sendLinkReset(){
    if (this.emailNew !== '') {
      this.authService.resetEmail(this.email, this.password, this.emailNew).then(() => {
        console.log('enviado');
      }).catch(() => {
        console.log('error');
      });
    } else {
      alert('Ingresar un correo registrado');
    }

  }
}
