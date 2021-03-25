import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  public displayName: string;
  public email: string;
  public password: string;
  public cpassword: string;
  public descripcion: string;
  public peso: number;
  public photoURL = 'https://firebasestorage.googleapis.com/v0/b/lagerale-7660b.appspot.com/o/users%2FEstilos.jpg?alt=media&token=500f7e22-7f6c-4e1a-8678-c44ec0214fb7';

  upLoadPercent: Observable<number>;
  urlImage: Observable<string>;

  constructor(private auth: AuthService, private router: Router, public alert: AlertController,
              private storage: AngularFireStorage) { }

  ngOnInit() {
  }

  onSubmitRegister(){
    if (this.password !== this.cpassword){
      this.showAlert('Error', 'Las contraseñas no coinciden.');
      return console.error('Las contraseñas no coinciden.');
    }
    this.auth.register( this.email, this.password, this.displayName, this.cpassword, this.descripcion, this.peso, this.photoURL).then(auth => {
      this.router.navigate(['/tabs/tab2']);
      console.log(auth);
    }).catch(err => this.showAlert('El email ingresado ya esta registrado.', 'Intente con otro o ingrese.'));
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
