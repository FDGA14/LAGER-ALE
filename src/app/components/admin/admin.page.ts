import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  public usuarios: any;
  public user: any;
  public status: any;

  constructor(
    private authService: AuthService,
    private userSvc: UsersService,
    public alert: AlertController
  ) { }

  ngOnInit() {
    this.userSvc.getUsuarios().subscribe(usuarios => {
      // console.log(usuarios);
      this.usuarios = usuarios;
    });

    this.authService.userData$.subscribe(user => {
      // tslint:disable-next-line: no-unused-expression
      console.log('User=>', user);
      this.user = user;
    });
  }

  deleteCerveceria(user){
    console.log(user);
    this.alert.create({
      header: 'Deseas eliminar al usuario ' + user.displayName,
      subHeader: 'Si se elimina no se podra recuperar la información y este usuario no podrá ingresar al sistema',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
            this.status = 'Cancelar';
            console.log(data, this.status);
          }
        },
        {

          text: 'Eliminar',
          handler: data => {
            this.status = 'Eliminada';
            console.log('Eliminar usuario');
            this.authService.deleteUser(user.email, user.password, this.user.email, 'Admin123');
            this.userSvc.deleteUserToFirebase(user.uid);
            this.showAlert('Usuario eliminado.', `El usuario: ${user.displayName} ha sido eliminado del sistema`);
          }
        }
      ]
    }).then((confirmElement) => {
      confirmElement.present();
    });
  }

  dataUser(user){
    console.log('Se accedio a la funcion', user);
    this.alert.create({
      header: 'Usuario: ' + user.displayName,
      inputs: [
        {
          type: 'radio',
          label: 'Usuario cervecería',
          value: 'Usuario cervecería'
        },
        {
          type: 'radio',
          label: 'Eliminar usuario',
          value: 'Eliminar usuario'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {

          text: 'Aceptar',
          handler: data => {
            console.log('Data', data);
            if (data === 'Usuario cervecería'){
              console.log('Se abre la alert para agregar al usuario como usuario cervcería');
              this.showAlert('Nuevo usuario cervecería', `El usuario: ${user.displayName} se ha convertido en usuario cervecería`);
              const cerv = true;
              this.userSvc.sendUserCervToFirebase(cerv, user.uid);
            } else if (data === 'Eliminar usuario') {
              console.log('Eliminar usuario');
              this.authService.deleteUser(user.email, user.password, this.user.email, 'Admin123');
              this.userSvc.deleteUserToFirebase(user.uid);
              this.showAlert('Usuario eliminado.', `El usuario: ${user.displayName} ha sido eliminado del sistema`);
            }
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
