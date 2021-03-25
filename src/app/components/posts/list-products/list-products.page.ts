import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { CervezasService, cerveza } from '../../../services/cervezas.service';
import { AuthService } from '../../../services/auth.service';
import { CervezaInterface } from '../../models/cerveza';
import Swal from 'sweetalert2';
import { MatDialog, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { AlertController, ModalController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { StoresComponent } from '../../stores/stores.component';
import { element } from 'protractor';

declare var google;

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.page.html',
  styleUrls: ['./list-products.page.scss'],
})
export class ListProductsPage implements OnInit {
  profileForm: any;
  status = '';

  constructor(private cervSvc: CervezasService,
              private authService: AuthService,
              public dialog: MatDialog,
              private alert: AlertController,
              private modal: ModalController,
              ) { }

  public cervezas: any = [];
  public cerveceria: any = [];
  public uid: any = [];
  public arrayReport: any = [];
  public reportsImg: any = [];
  public reportsEstilo: any = [];
  public reportsInfo: any = [];


  ngOnInit() {
    this.authService.userData$.subscribe(user => {
      // tslint:disable-next-line: no-unused-expression
      this.cerveceria = user.displayName;
      this.uid = user.uid;
      console.log('User=>', user.displayName);
    });

    this.cervSvc.getCervezas().subscribe(res => {
      console.log('Cervezas', res);
      this.cervezas = res;
    });
  }

  addStores(cerveza: cerveza){ // cerveza es mi interfaz la cual esta en cervezaservice
    console.log('Agregar puntos de venta para la cerveza', cerveza);
    this.modal.create ({
      component: StoresComponent,
      componentProps: {
        nombre: cerveza.nombre,
        img: cerveza.img,
        id: cerveza.id
      }
    }).then((modal) => modal.present());
    }

    reports(cerveza: cerveza){ // cerveza es mi interfaz la cual esta en cervezaservice
      console.log('Los reportesImg de la cerveza', cerveza?.reportImg?.length);
      this.reportsImg = cerveza?.reportImg?.length;
      console.log('Los reportesInfo de la cerveza', cerveza?.reportInfo?.length);
      this.reportsInfo = cerveza?.reportInfo?.length;
      console.log('Los reportesEstilo de la cerveza', cerveza?.reportEstilo?.length);
      this.reportsEstilo = cerveza?.reportEstilo?.length;
      if (this.reportsImg === undefined) {
        this.reportsImg = 0;
      }
      if (this.reportsInfo === undefined) {
        this.reportsInfo = 0;
      }
      if (this.reportsEstilo === undefined) {
        this.reportsEstilo = 0;
      }

      this.alert.create({
        header: 'Reportes de la cerveza',
        subHeader: 'Usuarios han reportado esta cerveza por los siguientes motivos.',
        message: `<ul>
        <li> Imagen incorrecta: ${this.reportsImg}</li>
        <li> Información incorrecta: ${this.reportsInfo}</li>
        <li> Estilo incorrecto: ${this.reportsEstilo}</li>
      </ul>
      <p>A los 6 reportes se elimina la cerveza</p>`,
        buttons: [
          {
            text: 'Cancelar',
            handler: (data) => {
              this.status = 'Cancelado';
            }
          },
          {
            text: 'Editar',
            handler: (data) => {
              this.status = 'Editar';
              this.onEdit(cerveza);
            }
          }
        ]
      }).then((confirmElement) => {
        confirmElement.present();
      });
      }

  onEdit(cerv: cerveza){ // cerveza es mi interfaz la cual esta en cervezaservice
    console.log('Edit cerveza', cerv);
    this.openDialogo(cerv);
      }

  // onDelete(cerv: cerveza){
    // console.log('Delete cerveza', cerv);
    // Swal.fire({
      // title: 'Estas seguro?',
      // text: 'No podras revertir esta acción',
      // icon: 'warning',
      // showCancelButton: true,
      // confirmButtonColor: '#3085d5',
      // cancelButtonColor: '#d33',
      // cancelButtonText: 'CANCELAR',
    // }).then(resultado => {
      // if (resultado.value){
        // Usuario quiere borrar
        // this.cervSvc.deleteCerveza(cerv).then(() => {
          // console.log('delete');
          // Swal.fire('Eliminado', 'Cerveza eliminada', 'success');
        // }).catch((error) => {
          // console.log('error', error);
        // });
      // }
    // });
  // }

  deleteCerveza(cerv: cerveza){
    console.log('Delete cerveza', cerv);
    this.alert.create({
      header: 'Deseas eliminar esta cerveza?',
      subHeader: 'No podrás recuperar la información de esta.',
      buttons: [
        {
          text: 'Cancelar',
          handler: (data) => {
            this.status = 'Cancelado';
          }
        },
        {
          text: 'Ok',
          handler: (data) => {
            this.status = 'Eliminada';
            this.cervSvc.deleteCerveza(cerv);
          }
        }
      ]
    }).then((confirmElement) => {
      confirmElement.present();
    });
  }

  onNew(cerv: cerveza){
    console.log('New post');
    this.openDialogo();
      }

  openDialogo(cerv?: cerveza): void{
    const config = {
      data: {
        message: cerv ? 'Editar cerveza' : 'Agregar',
        content: cerv
      }
    };
    const dialog = this.dialog.open(ModalComponent, config);
    dialog.afterClosed().subscribe(result => {
          console.log(`Dialog result ${result}`);
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
