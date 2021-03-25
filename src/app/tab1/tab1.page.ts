import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { userInfo } from 'os';
import { AuthService } from '../services/auth.service';
import { UsersService } from '../services/users.service';



@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  vol: number;
  porcentaje: number;
  peso: number;
  cantidad: number;
  respf: number;
  resp: number;
  respt: number;
  public Uid: string;
  public userInfo: any = [];

  constructor(public authService: AuthService,
              public alert: AlertController,
              private userSvc: UsersService) {}

ngOnInit() {

  this.authService.userData$.subscribe(user => {
    this.Uid = user.uid;
    this.userSvc.getUser(user.uid).subscribe(User => {
      this.userInfo = User;
      console.log('UserInfo', this.userInfo);
      if (this.userInfo.peso){
        this.peso = this.userInfo?.peso;
      }
    });
  });

}

  operacion(){
    // tslint:disable-next-line: no-unused-expression
    if (this.vol < 99 || this.porcentaje < 1 || this.peso < 40 || this.cantidad < 1){
    this.showAlert('Error', 'Ingresar los datos de manera correcta: Volumen en mililitros y mayor a 99ml.  Porcentaje mayor a 1%. Peso mayor a 40KG. Cantidad mayor a 1.');
    return console.error('Ingresar los datos de manera correcta: Volumen en mililitros y mayor a 99ml.  Porcentaje mayor a 1%. Peso mayor a 40KG. Cantidad mayor a 1.');
    }else{
      this.resp = (this.vol * this.porcentaje * 0.8) / (100);
      console.log(this.resp);
      this.respf = (this.resp) / (this.peso * 0.8);
      console.log(this.respf);
      this.respt = this.respf * this.cantidad;
      console.log(this.respt);
    }
  }

  mensaje0(){
    if (this.respt < 0.25) {
        this.showAlert('Si va a manejar, no consumir mas alcohol.', 'El estado de ebriedad aproximado es poco, esto puede cambiar por cada persona. ESTO ES UN APROXIMADO.');
    }
  }

  mensaje1(){
    if (this.respt > 0.25 && this.respt < 0.40) {
        this.showAlert('Se le recomienda no manejar ' + this.respt.toPrecision(2), 'Este estado ya equivale a una multa equivalente de ciento cincuenta a doscientos días de salario mínimo general, vigente en la zona económica en donde se cometa la infracción, a la persona que conduzca un vehículo automotor y con arresto administrativo inconmutable de doce a veinticuatro horas a la persona que conduzca un vehículo. Se le recomienda no manejar. ESTO ES UN APROXIMADO.');
    }
  }

  mensaje2(){
    if (this.respt > 0.41 && this.respt < 0.65) {
        this.showAlert('Favor de no manejar ' + this.respt.toPrecision(2), 'Este estado ya equivale a una multa con arresto administrativo inconmutable de doce a veinticuatro horas a la persona que conduzca un vehículo. No manejar. ESTO ES UN APROXIMADO.');
    }
  }

  mensaje3(){
    if (this.respt > 0.65) {
        this.showAlert('NO MANEJAR ' + this.respt.toPrecision(2), 'Este estado ya equivale a una multa con arresto administrativo inconmutable de veinticuatro a treinta y seis horas; Se cancelará definitivamente la licencia de conducir de la persona que se vuleva a manejar con este nivel de ebriedad; Además, dicha persona será sometida a una investigación de trabajo social y a exámenes de toxicomanía y alcoholismo.');
    }
  }

  async showAlert(header: string, message: string){
    const alert = this.alert.create({
      header,
      message,
      buttons: ['Ok']
    });
    await  (await alert).present();
  }

  Onlogout(){
    this.authService.logout();
  }

}
