import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController, AlertController } from '@ionic/angular';
import { comentario } from '../models/comentario';
import { CervezasService, cerveza } from '../../services/cervezas.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from 'src/app/services/auth.service';
import { Wishlist } from '../models/wishlist';
import { UsersService } from 'src/app/services/users.service';
import { map } from 'rxjs/operators';
import { Likes } from '../models/likes';
import { stringify } from 'querystring';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { firestore } from 'firebase';
import { UserInterface } from '../models/user';
import { userInfo } from 'os';
declare var google;

interface Marker {
  position: {
    lat: number,
    lng: number,
  };
  title: string;
}

@Component({
  selector: 'app-cerveza',
  templateUrl: './cerveza.component.html',
  styleUrls: ['./cerveza.component.scss'],
})
export class CervezaComponent implements OnInit {

map = null;
id: any;
public showDetails = false;

  public nombre: string;
  public img;
  public cerveza: string;
  public cervimg: string;
  public precio: string;
  public estilo: string;
  public cerveceria: string;
  public volumen: string;
  public descripcion: string;
  public pais: string;
  arrayStoresPosition = [];
  avanzado: any;

  public chat: any;
  public msg: string;

  public comentarios = ['prueba1', 'prueba2'];
  public room: any;
  public User: any;
  // public stars: any;
  public avg: any;

  public cal: number;

  public displayName: string;
  public uid: string;

  public rangeVal1: number;
  public rangeVal2: number;
  public rangeVal3: number;
  public rangeVal4: number;
  // public avgRangeVal1: any;
  reportsAll: number;
  //
 bookmarkType = 'bookmark';

 public guest: string;

 public Uid: string;
 public followers: any = [];
 public userInfo: any = [];

 UserS: any = [];

 UserSvcUid: any = [];


 Message: any;
 public Cerveceria: any = [];
  room1: any;

  status = '';
  arrayStarsUID = [];
  arrayStarsCal: any = [];
  arrayUidComms: any = [];

  constructor( private navParams: NavParams, private modal: ModalController, private af: AngularFireAuth,
               private chatService: CervezasService, private authService: AuthService, public alert: AlertController,
               private userSvc: UsersService, private afs: AngularFirestore ) { }

  ngOnInit() {

    this.loadMap();
    this.nombre = this.navParams.get('nombre');
    this.img = this.navParams.get('img');
    this.cervimg = this.navParams.get('cervimg');
    this.precio = this.navParams.get('precio');
    this.estilo = this.navParams.get('estilo');
    this.cerveceria = this.navParams.get('cerveceria');
    this.volumen = this.navParams.get('volumen');
    this.descripcion = this.navParams.get('descripcion');
    this.pais = this.navParams.get('pais');

    this.chat = this.navParams.get('chat');

    this.authService.userData$.subscribe(user => {
      this.Uid = user.uid;
      this.userSvc.getUser(user.uid).subscribe(User => {
        this.userInfo = User;
        console.log('UserInfo', this.userInfo);
        /////////////////////////////FOR PARA COMPARAR EL LIKE DADO
        for (const i in this.userInfo?.likesDados) {
          this.arrayUidComms.push(this.userInfo?.likesDados[i]?.content);
                }
        console.log('Arreglo de UID comms', this.arrayUidComms);
        //////////////////////////////////////////////////////////

        if (this.userInfo?.likes?.length >= 4){
          // console.log('LIKES LENGTH', this.userInfo.likes);
          const avanzado = true;
          this.chatService.sendAvanzadoToFirebase(avanzado, this.Cerveceria);
          if (!this.userInfo?.alerted){
            this.showAlert('Ya eres usuario avanzado', 'Al ser usuario avanzado puedes modificar las graficas cerveceras y el resto de los usuarios te reconoceran con un indicador en tus comentarios');
            this.chatService.sendAlertedToFirebase(avanzado, this.Cerveceria);
          }
        }
      });
    });

    this.userSvc.getUsuarios().subscribe(user => {
      this.UserS = user;
      // console.log('usuarios: ', this.UserS);
      const comentario = this.UserS.find(user => {
        // console.log(user)
        this.UserSvcUid = user.uid;
        // console.log('USER uid', this.UserSvcUid);
      });
    });

    this.authService.userData$.subscribe(user => {
      this.guest = user.email;
      // this.currentImage = user.photoURL;
      console.log('Guest=>', this.guest);
    });

    this.chatService.getChatRoom(this.chat.id).subscribe(room => {
      console.log('cerveza', room);
      this.room = room;
      this.room1 = this.room.cerveceria;
      console.log('cerveceria', this.room1);
      console.log('comentarios', this.room.messages);
      // ARRAY PARA COMPROBAR QUE NO PUEDA MODFICAR LA CALIFICACION DE ESTRELLAS
      // tslint:disable-next-line: forin
      /////////////////////////////////////////////////////////////////////////////
      console.log('Stores', this.room.stores);
      for (const i in this.room.stores) {
        this.arrayStoresPosition.push(this.room.stores[i].position);
              }
      console.log('Arreglo de nombres de tiendas', this.arrayStoresPosition);
    });

    this.authService.userData$.subscribe(user => {
      this.displayName = user.displayName;
      // console.log('User displayName=>', user.displayName);
      });

    this.authService.userData$.subscribe(user => {
      this.Cerveceria = user.uid;
      console.log('User=>', this.Cerveceria);
    });

    this.authService.userData$.subscribe(user => {
      this.uid = user.uid;
      console.log('User=>', this.uid);
    });

    this.chatService.getChatRoom(this.chat.id).subscribe(room => {
      this.room = room;
      console.log('Estrellas', this.room.stars);
      // ARRAY PARA COMPROBAR QUE NO PUEDA MODFICAR LA CALIFICACION DE ESTRELLAS
      // tslint:disable-next-line: forin
      for (const i in this.room.stars) {
        this.arrayStarsUID.push(this.room.stars[i].uid);
              }
      console.log('Arreglo de stars', this.arrayStarsUID);
      /////////////////////////////////////////////////////////////////////////////
      // ARRAY PARA OBTENER EL VALOR DE LAS ESTRELLAS
      // tslint:disable-next-line: forin
      for (const i in this.room.stars) {
        this.arrayStarsCal.push(this.room.stars[i].Calificacion);
              }
      console.log('Arreglo de calificacion estrellas', this.arrayStarsCal);
      ///////////////////////////////////////////////////////////////////////////
      // PROMEDIO DE LAS ESTRELLAS
      if (this.arrayStarsCal?.length){
      let sum = 0;
      // tslint:disable-next-line: prefer-for-of
      for ( let i = 0; i < this.arrayStarsCal.length; i++ ){
    sum += parseInt( this.arrayStarsCal[i], 10 ); // don't forget to add the base
}
      this.avg = sum / this.arrayStarsCal.length;
      console.log(this.avg);
      } else {
        this.avg = ('Sin estrellas');
      }
    });

    this.chatService.getChatRoom(this.chat.id).subscribe(room => {
      this.room = room;
      console.log('Range Val 1', this.room.rangeVal1);
      if (this.room.rangeVal1){
        let sum = 0;
        for ( let i = 0; i < this.room.rangeVal1.length; i++ ){
              sum += parseInt( this.room.rangeVal1[i], 10 ); // don't forget to add the base
        }
        this.rangeVal1 = sum / this.room.rangeVal1.length;
      } else {
        this.rangeVal1 = (5);
      }
    });

    this.chatService.getChatRoom(this.chat.id).subscribe(room => {
      this.room = room;
      console.log('Range Val 2', this.room.rangeVal2);
      if (this.room.rangeVal2){
        let sum = 0;
        for ( let i = 0; i < this.room.rangeVal2.length; i++ ){
              sum += parseInt( this.room.rangeVal2[i], 10 ); // don't forget to add the base
        }
        this.rangeVal2 = sum / this.room.rangeVal2.length;
        console.log('promedio range val2', this.rangeVal2);
      } else {
        this.rangeVal2 = (5);
      }
    });

    this.chatService.getChatRoom(this.chat.id).subscribe(room => {
      this.room = room;
      console.log('Range Val 3', this.room.rangeVal3);
      if (this.room.rangeVal3){
        let sum = 0;
        // tslint:disable-next-line: prefer-for-of
        for ( let i = 0; i < this.room.rangeVal3.length; i++ ){
              sum += parseInt( this.room.rangeVal3[i], 10 ); // don't forget to add the base
        }
        this.rangeVal3 = sum / this.room.rangeVal3.length;
        console.log('promedio', this.rangeVal3);
      } else {
        this.rangeVal3 = (5);
      }
    });

    this.chatService.getChatRoom(this.chat.id).subscribe(room => {
      this.room = room;
      console.log('Range Val 4', this.room.rangeVal4);
      if (this.room.rangeVal4){
        let sum = 0;
        // tslint:disable-next-line: prefer-for-of
        for ( let i = 0; i < this.room.rangeVal4.length; i++ ){
              sum += parseInt( this.room.rangeVal4[i], 10 ); // don't forget to add the base
        }
        this.rangeVal4 = sum / this.room.rangeVal4.length;
        console.log('promedio', this.rangeVal3);
      } else {
        this.rangeVal4 = (5);
      }
    });
  }

  loadMap() {
    // create a new map by passing HTMLElement
    const mapEle: HTMLElement = document.getElementById('gmap');
    // create LatLng object
    const myLatLng = {lat: 20.66682, lng: -103.39182};
    // create map
    this.map = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 12
    });

    google.maps.event.addListener(this.map, 'idle', () => {
      // this.renderMarkers();
      mapEle.classList.add('show-map');
      if (this.room1 === 'Minerva'){
      this.renderMarkerMinerva();
      } else if (this.room1 === 'Cucapá'){
        this.renderMarkerCucapa();
      } else if (this.room1 === 'Cervecería de Colima'){
        this.renderMarkerCervColima();
      }  else if (this.room1 === 'Erdinger'){
        this.renderMarkerErdinger();
      } else if (this.room1 === 'Modelo'){
        this.renderMarkerModelo();
      } else if (this.room1 === 'Corona'){
        this.renderMarkerCorona();
      } else if (this.room1 === 'Anima de Sayula'){
        this.renderMarkerAnimaSay();
      } else if (this.room1 === 'Guinness'){
        this.renderMarkerGuinness();
      } else if (this.room1 === 'Stella Artois'){
        this.renderMarkerStellaArtois();
      }
    });
  }

  renderMarkerMinerva() {
    this.room.stores.forEach(marker => {
      //console.log('marker', marker);
      this.addMarker(marker);
    });
  }

  renderMarkerCucapa() {
    this.room.stores.forEach(marker => {
      //console.log('marker', marker);
      this.addMarker(marker);
    });
  }

  renderMarkerCervColima() {
    this.room.stores.forEach(marker => {
      // console.log('marker', marker);
      this.addMarker(marker);
    });
  }

  renderMarkerErdinger() {
    this.room.stores.forEach(marker => {
      // console.log('marker', marker);
      this.addMarker(marker);
    });
  }

  renderMarkerModelo() {
    this.room.stores.forEach(marker => {
      // console.log('marker', marker);
      this.addMarker(marker);
    });
  }

  renderMarkerCorona() {
    this.room.stores.forEach(marker => {
      // console.log('marker', marker);
      this.addMarker(marker);
    });
  }

  renderMarkerAnimaSay() {
    this.room.stores.forEach(marker => {
      // console.log('marker', marker);
      this.addMarker(marker);
    });
  }

  renderMarkerGuinness() {
    this.room.stores.forEach(marker => {
      // console.log('marker', marker);
      this.addMarker(marker);
    });
  }

  renderMarkerStellaArtois() {
    this.room.stores.forEach(marker => {
      // console.log('marker', marker);
      this.addMarker(marker);
    });
  }

  addMarker(marker) {
    // console.log('ADD MARKER', marker);
    const content = '<h1>' + marker.store + '</h1>' + marker.location;
    let marker_custom = new google.maps.Marker({
      position: marker.position,
      map: this.map,
      title: marker.store
    });
    this.addInfoWindow(marker_custom, content);
  }

  addInfoWindow(marker, content) {
    const infoWindow = new google.maps.InfoWindow({
        content
    });
    google.maps.event.addListener(marker, 'click', () => {
        infoWindow.open(this.map, marker);
    });
}

  closeChat(){
    this.modal.dismiss();
  }

  updateLike(comentario: comentario){
    console.log(comentario);
    const like = {
      content: comentario.content,
      idPublicacion: this.room.id,
      uid: this.Cerveceria
    };
    if (this.userInfo.uid === comentario.UID){
      this.showAlert('No puedes hacer autolike', '');
    }else if (this.arrayUidComms.includes(comentario.content)){
      this.showAlert('Ya has dado like a este comentario', 'Solo puedes darle like una vez a un comentario');
    } else {
    this.chatService.sendLikeMessageToFirebase(like, comentario.UID);
    const disteLike = {
      content: comentario.content,
      idPublicacion: this.room.id,
      comentarioUID: comentario.UID,
      uid: this.Cerveceria
    };
    console.log('DISTE LIKE', disteLike);
    this.chatService.sendLikeDadoMessageToFirebase(disteLike, this.Cerveceria);
    this.showAlert('Diste like al comentario', '');
  }
  }

  async sendComentario(){
    // console.log('User informa', this.userInfo.avanzado);
    if (this.userInfo.likes?.length >= 2){
      console.log('LIKES LENGTH', this.userInfo.likes);
      this.avanzado = true;
    } else {
      console.log('THIS.AVANZADO', this.avanzado);
      this.avanzado = false;
    }
    const mensaje: comentario = {
      content: this.msg,
      type: 'text',
      date: new Date(),
      displayName: this.displayName,
      UID: this.Cerveceria,
      avanzado: this.avanzado
    };
    console.log(',Mensaje', mensaje);
    this.chatService.sendMsgToFirebase(mensaje, this.chat.id);
    this.msg = '';
  }

  deleteComentario(comentario: comentario){
    console.log('Comentario', comentario);
    const like: Likes = {
      content: comentario.content,
      idPublicacion: this.room.id
    };
    this.alert.create({
      header: 'Deseas eliminar este comentario?',
      subHeader: 'No podrás recuperar la información de este.',
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
            this.chatService.deleteMsgToFirebase(comentario, this.chat.id);
            this.chatService.deleteLikeToFirebase(like, comentario.UID);
          }
        }
      ]
    }).then((confirmElement) => {
      confirmElement.present();
    });
  }

  async sendWishlist(){
    const wishlist = this.room;
    this.chatService.sendWishlistToFirebase(wishlist, this.Cerveceria);
    this.showAlert('Agregada', 'Cerveza agregada a wishlist');
  }

  async sendFavoritas(){
    const favorita: Wishlist = {
      uid: this.uid,
      user: this.displayName,
      cerveceria: this.cerveceria,
      cerveza: this.nombre,
      img: this.img,
      descripcion: this.descripcion,
      estilo: this.estilo
    };
    // console.log('Favorita', favorita);
    this.chatService.sendFavoritaToFirebase(favorita, this.Cerveceria);
    this.showAlert('Agregada', 'Cerveza agregada a favoritas');
  }

  async sendComentada(){
    const comentada: Wishlist = {
      uid: this.uid,
      user: this.displayName,
      cerveceria: this.cerveceria,
      cerveza: this.nombre,
      img: this.img,
      descripcion: this.descripcion,
      estilo: this.estilo,
    };
    // console.log('Comentada', comentada);
    this.chatService.sendComentadaToFirebase(comentada, this.Cerveceria);
  }

  async showAlert(header: string, message: string){
    const alert = this.alert.create({
      header,
      message,
      buttons: ['Ok']
    });
    await  (await alert).present();
  }

  toggleDetails() {
    this.showDetails = !this.showDetails;
 }

  // updateStars(){
    // if (this.cal < 1 || this.cal > 5){
      // console.log('La minima es 1 y la maxima es 5', this.room.stars);
    // } else {
        // this.chatService.sendLikesToFirebase(this.cal, this.chat.id);
        // this.cal = this.cal;
        // console.log('Calificacion actualizada', this.room.stars);
      // }
    // }

    updateRange1(){
      this.chatService.sendRangeVal1ToFirebase(this.rangeVal1, this.chat.id);
      this.rangeVal1 = this.rangeVal1;
      // console.log('rangeVal1 actualizado', this.room.rangeVal1);
      // console.log('Update Range 2', this.room.rangeVal1);
    }

    updateRange2(){
      this.chatService.sendRangeVal2ToFirebase(this.rangeVal2, this.chat.id);
      this.rangeVal2 = this.rangeVal2;
      // console.log('rangeVal2 actualizado', this.room.rangeVal2);
      // console.log('Update Range 2', this.room.rangeVal2);
    }

    updateRange3(){
      this.chatService.sendRangeVal3ToFirebase(this.rangeVal3, this.chat.id);
      this.rangeVal3 = this.rangeVal3;
      console.log('rangeVal3 actualizado', this.room.rangeVal3);
      console.log('Update Range 3', this.room.rangeVal3);
    }

    updateRange4(){
      this.chatService.sendRangeVal4ToFirebase(this.rangeVal4, this.chat.id);
      this.rangeVal4 = this.rangeVal4;
      console.log('rangeVal4 actualizado', this.room.rangeVal4);
      console.log('Update Range 4', this.room.rangeVal4);
    }

    reportCerveza(){
      console.log('Cerveza', this.room);
      const beer = this.room;
      this.alert.create({
        header: 'Deseas reportar esta cerveza?',
        inputs : [
          {
            type: 'radio',
            label: 'Estilo incorrecto',
            value: 'Estilo incorrecto'
          },
          {
            type: 'radio',
            label: 'Imagen incorrecta',
            value: 'Imagen incorrecta'
          },
          {
            type: 'radio',
            label: 'Información incorrecta',
            value: 'Información incorrecta'
          }
        ],
        buttons: [
          {
            text: 'Cancelar',
            handler: (data) => {
              this.status = 'Cancelado';
            }
          },
          {
            text: 'Reportar',
            handler: (data) => {
              this.status = 'Reportada';
              console.log('Que tipo de data reporto', data);
              if (data === 'Estilo incorrecto') {
                console.log('ESTILO INCORRECTO');
                const reportComp = {
                  reporte: data,
                  uid: this.Uid
                };
                console.log(reportComp);
                this.chatService.sendReportEstiloToFirebase(reportComp, this.chat.id);

              } else if (data === 'Imagen incorrecta') {
                console.log('IMAGEN INCORRECTO');
                const reportComp = {
                  reporte: data,
                  uid: this.Uid
                };
                console.log(reportComp);
                this.chatService.sendReportImgToFirebase(reportComp, this.chat.id);

              } else if (data === 'Información incorrecta'){
                console.log('INFORACION INCORRECTO');
                const reportComp = {
                  reporte: data,
                  uid: this.Uid
                };
                console.log(reportComp);
                this.chatService.sendReportInfoToFirebase(reportComp, this.chat.id);
            }

              this.showAlert('Reportada', 'Cerveza reportada.');
              console.log(this.chat.reportEstilo?.length);
              console.log(this.chat.reportImg?.length);
              console.log(this.chat.reportInfo?.length);
              this.reportsAll = this.chat.reportEstilo.length + this.chat.reportImg.length + this.chat.reportInfo.length;
              console.log(this.reportsAll);
              // Al reporta por 6ta vez se elimina, o sea, se elimina a la 6ta vez
              if (this.reportsAll === 5) {
                this.chatService.sendDeleteCervezaByReportToFirebase(this.chat.id);
                this.showAlert('Eliminada', 'La cerveza fue reportada y eliminada por información incorrecta varias veces.');
              }
              // this.chatService.deleteMsgToFirebase(comentario, this.chat.id);
              // this.chatService.deleteLikeToFirebase(like, comentario.UID);
            }
          }
        ]
      }).then((confirmElement) => {
        confirmElement.present();
      });
    }

    updateStars(){
      console.log('Cerveza', this.room);
      this.alert.create({
        header: 'Deseas calificar la cerveza?',
        inputs: [
          {
            name: 'Calificacion',
            placeholder: 'Del 1 al 5',
            type: 'number'
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
            text: 'Calificar',
            handler: data => {
              console.log('Data', data);
              if (data.Calificacion < 0 || data.Calificacion > 5) {
                this.showAlert('Error', 'La calificación es del 1 al 5');
              } else if (this.arrayStarsUID.includes(this.Cerveceria)) {
                this.showAlert('Ya calificaste la cerveza', 'No puedes modificar la calificación de esta cerveza.');
              } else {
                const calificacion = {
                  Calificacion: data.Calificacion,
                  uid: this.Cerveceria
                };
                console.log('Se manada la actualización a firestore', calificacion);
                this.chatService.sendStarsToFirebase(calificacion, this.chat.id);
                const cervCal = {
                  cal: data.Calificacion,
                  cerveza: this.chat
                };
                console.log('SE MANDA CALIFICACION', cervCal);
                console.log('THIS.USERINFO', this.Cerveceria);
                this.userSvc.sendCervCalToFirebase(cervCal, this.Cerveceria);
                this.showAlert('Calificada', 'Cerveza calificada.');
              }
            }
          }
        ]
      }).then((confirmElement) => {
        confirmElement.present();
      });
    }

  }
