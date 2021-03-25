import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';
import { Scan } from '../models/scan';

@Component({
  selector: 'app-scans',
  templateUrl: './scans.page.html',
  styleUrls: ['./scans.page.scss'],
})
export class ScansPage implements OnInit {

  public uid: string;
  public users: any = [];

  constructor(public authService: AuthService, private userSvc: UsersService, public alert: AlertController) { }

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

  async deleteScan(scan: Scan){
    const wish: Scan = {
      uid: scan.uid,
      displayName: scan.displayName,
      resultado: scan.resultado,
      img: scan.img
    };
    this.showAlert('Eliminado', 'Escaneo eliminado.');
    this.userSvc.deleteScan(scan, this.uid);
    console.log('Deleted Scan', scan);
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
