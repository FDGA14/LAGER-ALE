import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import 'firebase/database'; // If using Firebase database
import 'firebase/storage';  // If using Firebase storage

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { firebaseConfig } from '../environments/environment';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreModule, SETTINGS, } from '@angular/fire/firestore';
import { CervezaComponent } from './components/cerveza/cerveza.component';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from './components/posts/modal/modal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { NewProductPage } from './components/posts/new-product/new-product.page';
import { EditProductModule } from './components/posts/edit-product/edit-product.module';
import { EditProductComponent } from './components/posts/edit-product/edit-product.component';
import { UserComponent } from './components/user/user.component';
import { ModalPublComponent } from './components/publicaciones/modal-publ/modal-publ.component';
import { NewPublicacionComponent } from './components/publicaciones/new-publicacion/new-publicacion.component';
import { PublicacionComponent } from './components/publicacion/publicacion.component';
import { EditPublicacionComponent } from './components/publicaciones/edit-publicacion/edit-publicacion.component';
import { Camera } from '@ionic-native/camera/ngx';
import { HttpClientModule} from '@angular/common/http';
import { ModalProfileComponent } from './profile/modal-profile/modal-profile.component';
import { EditProfileComponent } from './profile/edit-profile/edit-profile.component';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { IonicStorageModule } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { StoresComponent } from './components/stores/stores.component';
import { FollowingModalComponent } from './components/following-modal/following-modal.component';
import { FollowersModalComponent } from './components/followers-modal/followers-modal.component';


@NgModule({
  declarations: [AppComponent, CervezaComponent, ModalComponent, NewProductPage, EditProductComponent,
    UserComponent, NewPublicacionComponent, ModalPublComponent, PublicacionComponent, EditPublicacionComponent,
    ModalProfileComponent, EditProfileComponent, StoresComponent, FollowingModalComponent, FollowersModalComponent],
  entryComponents: [CervezaComponent, ModalComponent, UserComponent, ModalPublComponent, PublicacionComponent,
    EditPublicacionComponent, ModalProfileComponent, EditProfileComponent, StoresComponent, FollowingModalComponent, FollowersModalComponent],
  imports: [BrowserModule, IonicModule.forRoot(), IonicStorageModule.forRoot(),
  AppRoutingModule, AngularFireModule.initializeApp(firebaseConfig),
  AngularFireAuthModule, AngularFirestoreModule, AngularFireStorageModule, FormsModule,
  BrowserAnimationsModule, MaterialModule, ReactiveFormsModule, EditProductModule, HttpClientModule],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFirestore,
    Camera,
    SocialSharing,
    Geolocation,
    NativeGeocoder,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: SETTINGS, useValue: {} }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
