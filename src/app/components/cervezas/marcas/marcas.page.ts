import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { CervezasService } from 'src/app/services/cervezas.service';
import { CervezaComponent } from '../../cerveza/cerveza.component';

@Component({
  selector: 'app-marcas',
  templateUrl: './marcas.page.html',
  styleUrls: ['./marcas.page.scss'],
})
export class MarcasPage implements OnInit {

  constructor(public authService: AuthService, public beers: CervezasService,
    private modal: ModalController) { }

  public cervezas: any = [];
  
  ngOnInit(): void {
    this.beers.getCervezas().subscribe(cervezas => {
      this.cervezas = cervezas;
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
        fecha: cerveza.fecha
      }
    }).then((modal) => modal.present());
  }

}
