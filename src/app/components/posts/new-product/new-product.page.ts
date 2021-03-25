import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { cerveza, CervezasService } from '../../../services/cervezas.service';
import { AuthService } from 'src/app/services/auth.service';
import { AlertController } from '@ionic/angular';
import { empty } from 'rxjs';


@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.page.html',
  styleUrls: ['./new-product.page.scss'],
})
export class NewProductPage implements OnInit {

  public image: any;
  public User: any = [];
  public imageUser: any = [];
  public uid: any = [];

  constructor(private cervezaSVC: CervezasService, private authService: AuthService, public alert: AlertController) { }

  public newPostForm = new FormGroup({
    nombre: new FormControl ('', Validators.required),
    img: new FormControl ('', Validators.required),
    descripcion: new FormControl ('', Validators.required),
    cerveceria: new FormControl('', Validators.required),
    uid: new FormControl('', Validators.required),
    precio: new FormControl ('', Validators.required),
    volumen: new FormControl ('', Validators.required),
    estilo: new FormControl ('', Validators.required),
    id: new FormControl ('', Validators.required),
    pais: new FormControl ('', Validators.required),
    porcentaje: new FormControl ('', Validators.required),
    tipo: new FormControl ('', Validators.required),
    elaboracion: new FormControl ('', Validators.required),
    fermentacion: new FormControl ('', Validators.required),
    granos: new FormControl ('', Validators.required)
  });

  ngOnInit() {
    this.authService.userData$.subscribe(user => {
      this.User = user.displayName;
      this.imageUser = user.photoURL;
      this.uid = user.uid;
      console.log('User=>', this.User);
    });
  }

  addNewPost(data: cerveza){
    console.log('New Post', data);
    if (data.uid === this.uid) {
      if (data.nombre !== '' && data.descripcion !== '' && data.tipo !== '' && data.estilo !== '' && data.pais !== '' && data.porcentaje !== '' && data.volumen !== '' && data.precio !== '') {
        this.cervezaSVC.preAddAndUpdatePost(data, this.image);
      } else {
        alert('Error');
      }
    } else {
      this.showAlert('Error', 'La imagen no termino de cargar o no se detecto la imagen. Favor de volver a intentar.');
      return console.error('Error.');
    }
  }

  handleImage(event: any): void{
    this.image = event.target.files[0];
    console.log('Imagen', this.image);
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
