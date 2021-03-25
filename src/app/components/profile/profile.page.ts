import { Component, OnInit } from '@angular/core';
import { auth } from 'firebase';
import { AuthService } from '../../services/auth.service';
import { UsersService } from '../../services/users.service';
import { map } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserInterface } from '../models/user';
import { profile } from 'console';
import { fileI } from '../models/files';
import { element } from 'protractor';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalProfileComponent } from '../../profile/modal-profile/modal-profile.component';
import { ModalComponent } from '../posts/modal/modal.component';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  // public image: fileI;
  // public currentImage = "https://picsum.photos/200";
  public users: any = [];
  public uid: string;
  public emailAuth: string;
  public photoURL = "https://firebasestorage.googleapis.com/v0/b/lagerale-7660b.appspot.com/o/LagerAle.png?alt=media&token=06e0a5e3-d706-45e5-b18a-735c586816d8";

  constructor(public authService: AuthService,
              private userSvc: UsersService,
              public dialog: MatDialog,
              private socialSharing: SocialSharing,
              public alert: AlertController) {}

    // public profileForm = new FormGroup({
      // displayName: new FormControl('', Validators.required),
      // email: new FormControl({value: '', disabled: true}, Validators.required ),
      // photoURL: new FormControl('', Validators.required)
    // });

  ngOnInit() {
    // this.initValuesForm(user);
    // this.authService.userData$.subscribe(user =>{
      // return this.initValuesForm(user);
      // console.log('User=>', user);
    // });

    this.userSvc.getUsuarios().subscribe(users => {
      this.users = users;
      console.log('Users', this.users);
    });

    this.authService.userData$.subscribe(user => {
      this.emailAuth = user.email
      this.uid = user.uid;
      console.log('User UID', this.uid);
      });
  }

  SendTwitter(){
    this.photoURL
    console.log('favoritas.img', this.photoURL);
    const text = 'Ya esta disponible LAGER & ALE. La aplicación para cerveceros.'
    console.log(text, this.photoURL);
    this.socialSharing.shareViaTwitter(text, null, this.photoURL).then(() => {
    }).catch(() => {
      this.showAlert('Error al compartir', 'Para compartir el contenido es necesario tener la aplicación instalada en el dispositivo movil.')
    });
  }

  SendInstagram(){
    this.photoURL
    console.log('favoritas.img', this.photoURL);
    const text = 'Ya esta disponible LAGER & ALE. La aplicación para cerveceros.' + this.photoURL;
    console.log(text, this.photoURL);
    this.socialSharing.shareViaInstagram(text, this.photoURL).then(() => {
    }).catch(() => {
      this.showAlert('Error al compartir', 'Para compartir el contenido es necesario tener la aplicación instalada en el dispositivo movil.')
    });
  }

  SendFacebook(){
    this.photoURL
    console.log('favoritas.img', this.photoURL);
    const text = 'Ya esta disponible LAGER & ALE. La aplicación para cerveceros.'
    console.log(text, this.photoURL);
    this.socialSharing.shareViaFacebook(text, this.photoURL, this.photoURL).then(() => {
    }).catch(() => {
      this.showAlert('Error al compartir', 'Para compartir el contenido es necesario tener la aplicación instalada en el dispositivo movil.')
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
  
  onEditUser(user: UserInterface){
    console.log('Editar usuario', user);
    this.openDialog(user);
  }

  onEditPassword(user: UserInterface){
    console.log('Editar usuario', user);
    this.authService.logoutToChangePassword();
  }

  openDialog(user?: UserInterface): void{
    const config = {
      data: {
        message: user ? 'Editar usuario' : 'Nuevo usuario',
        content: user
      }
    };
    const dialogRef = this.dialog.open(ModalProfileComponent, config);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result ${result}`);
    });
  }

  /**private initValuesForm(user: UserInterface): void{
    if(user.photoURL){
      this.currentImage = user.photoURL;
    }
    this.profileForm.patchValue({
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL
    });
  }

  onSaveUser(user:UserInterface): void {
    //console.log('save user')
    this.authService.preSaveUserProfile(user, this.image)
  }


  handleImage(event: any): void{
    this.image = event.target.files[0];
    console.log('Imagen', this.image);
  }
*/
}
