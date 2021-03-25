import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';
import { userInfo } from 'os';
import { CervezaComponent } from '../cerveza/cerveza.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-comentadas',
  templateUrl: './comentadas.page.html',
  styleUrls: ['./comentadas.page.scss'],
})
export class ComentadasPage implements OnInit {

  public Uid: string;
  public userInfo: any = [];
  public arrayCervCal: any = [];

  constructor(public authService: AuthService,
              private userSvc: UsersService,
              public modal: ModalController) { }

  ngOnInit() {
    this.authService.userData$.subscribe(user => {
      this.Uid = user.uid;
      this.userSvc.getUser(user.uid).subscribe(User => {
        this.userInfo = User;
        console.log('Cervezas calificadas', this.userInfo.cervCal);
        // tslint:disable-next-line: forin
        for (const i in this.userInfo.cervCal) {
          this.arrayCervCal.push(this.userInfo.cervCal[i].cerveza);
                }
        console.log('Arreglo de stars', this.arrayCervCal);
      });
    });
  }

  openCerveza(cerveza){
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
        fecha: cerveza.fecha
      }
    }).then((modal) => modal.present());
  }

}
