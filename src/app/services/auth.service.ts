import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { rejects } from 'assert';
import { promise } from 'protractor';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore/';
import { map, finalize } from 'rxjs/operators';
import { auth } from 'firebase';
import { Observable } from 'rxjs';
import { UserInterface } from '../components/models/user';
import { fileI } from '../components/models/files';
import { AngularFireStorage } from '@angular/fire/storage';




@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: any;

  public userData$: Observable<firebase.User>;
  private filePath: string;
  public photoURL = 'https://firebasestorage.googleapis.com/v0/b/lagerale-7660b.appspot.com/o/users%2FEstilos.jpg?alt=media&token=500f7e22-7f6c-4e1a-8678-c44ec0214fb7';

  private users: AngularFirestoreCollection<UserInterface>;
  private dowloadURL: Observable<string>;



  constructor( private afAuth: AngularFireAuth, private router: Router, private db: AngularFirestore, private storage: AngularFireStorage )
  {
    this.userData$ = afAuth.authState;
    this.users = db.collection <UserInterface>('users');

   }

  login(email: string, password: string){
    return new Promise((resolve, rejected) => {
      this.afAuth.signInWithEmailAndPassword(email, password).then(user => {
        this.user = user.user;
        console.log(this.user);
        resolve(user);
      }).catch(err => rejected(err));
    });
  }

  register(email: string, password: string, displayName: string, cpassword: string, descripcion: string, peso: number, photoURL: any){
    return new Promise ((resolve, reject) => {
      this.afAuth.createUserWithEmailAndPassword(email, password).then(async res => {
        // console.log(res.user.uid);
        const uid = res.user.uid;
        this.db.collection('users').doc(uid).set({
          displayName,
          email,
          password,
          cpassword,
          uid,
          descripcion,
          peso,
          photoURL
        });
        (await this.afAuth.currentUser).updateProfile({
          displayName
        });
        resolve (res);
      }).catch(err => reject(err));
    });
  }

  resetPassword(email: string){
    return this.afAuth.sendPasswordResetEmail(email);
  }

  deleteUser(email: string, password: string, emailAdmin, passwordAdmin){
    return new Promise((resolve, rejected) => {
      this.afAuth.signInWithEmailAndPassword(email, password).then(user => {
        this.user = user.user;
        console.log('se elimina el usuario', this.user);
        user.user.delete();
        resolve(user);
        this.login(emailAdmin, passwordAdmin).then(() => {
          this.router.navigate(['/admin']).then(() => {
            window.location.reload();
          });
        });
      }).catch(err => rejected(err));
    });
  }

  resetEmail(email: string, password: string, emailNew: string){
    return new Promise((resolve, rejected) => {
      this.afAuth.signInWithEmailAndPassword(email, password).then(user => {
        this.user = user.user;
        console.log(this.user);
        console.log('se envia el nuevo email', emailNew);
        user.user.updateEmail(emailNew);
        resolve(user);
      }).catch(err => rejected(err));
    });
  }

  logoutToChangePassword(){
    this.afAuth.signOut().then(() => {
      this.router.navigate(['/reset-password']).then(() => {
        window.location.reload();
      });
    });
  }

  logout(){
    this.afAuth.signOut().then(() => {
      this.router.navigate(['/login']).then(() => {
        window.location.reload();
      });
    });
  }

  preSaveUserProfile(user: UserInterface, image?: fileI): void{
    if (image){
      this.uploadImage(user, image);
    } else {
      this.saveUserProfile(user);
    }
  }

  private uploadImage(user: UserInterface, image: fileI): void{
    this.filePath = `users/${image.name}`;
    const fileRef = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, image);
    task.snapshotChanges()
    .pipe(
      finalize(() => {
      fileRef.getDownloadURL().subscribe(urlImage => {
        user.photoURL = urlImage;
        this.saveUserProfile(user);
     });
    })).subscribe();
  }



  async saveUserProfile(user: UserInterface) {

    (await this.afAuth.currentUser).updateProfile({
      displayName: user.displayName,
      photoURL: user.photoURL,
    })
    .then(() => console.log('User updated'))
    .catch(err => console.log('Error', err));
  }

}
