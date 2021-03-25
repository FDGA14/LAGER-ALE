import { Component, OnInit } from '@angular/core';
import { PublicacionesService } from '../../../services/publicaciones.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Publicacion } from '../../models/publicacion';
import { AuthService } from '../../../services/auth.service';
import { AlertController } from '@ionic/angular';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-new-publicacion',
  templateUrl: './new-publicacion.component.html',
  styleUrls: ['./new-publicacion.component.scss'],
})
export class NewPublicacionComponent implements OnInit {

  private image: any;
  public User: any;
  public imageUser: any = [];
  public uid: any;

  constructor(private publicacionSVC: PublicacionesService,
              private userSvc: UsersService,
              private authService: AuthService,
              public alert: AlertController) { }

  public newPublicacionForm = new FormGroup({
    descripcion: new FormControl('', Validators.required),
    imagePublicacion: new FormControl('', Validators.required),
    user: new FormControl('', Validators.required),
    uid: new FormControl('', Validators.required)
  });

  ngOnInit() {
    this.authService.userData$.subscribe(user => {
      this.User = user.displayName;
      this.uid = user.uid;
      console.log('User=>', user);
    });
  }

  addNewPublicacion(data: Publicacion){
    console.log('New Publicacion', data);
    if (data.uid === this.uid){
      this.publicacionSVC.preAddAndUpdatePublicacion(data, this.image);
      this.userSvc.sendPublicacionToFirebase(data, this.uid);
    } else {
      this.showAlert('Error', 'La imagen no termino de cargar o no se detecto la imagen. Favor de volver a intentar.')
      return console.error('Error.');
    }
  }

  handleImage(event: any): void{
    this.image = event.target.files[0];
    console.log('Image', this.image);
  }

  async showAlert(header: string, message: string){
    const alert= this.alert.create({
      header,
      message,
      buttons: ['Ok']
    });
    await  (await alert).present();
  }

}
