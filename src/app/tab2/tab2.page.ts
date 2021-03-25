import { Component, OnInit } from '@angular/core';
import { CervezasService, cerveza } from '../services/cervezas.service';
import { AlertController, ModalController } from '@ionic/angular';
import { CervezaComponent } from '../components/cerveza/cerveza.component';
import { AuthService } from '../services/auth.service';
// import { createWorker } from 'tesseract.js';
// import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { GoogleCloudVisionServiceService } from '../services/google-cloud-vision-service.service';
import { Camera, CameraOptions  } from '@ionic-native/camera/ngx';
import { storage } from 'firebase';
import { StoreService } from '../services/store.service';
import { UsersService } from '../services/users.service';
import { UserInterface } from '../components/models/user';
import * as firebase from 'firebase';
import { Scan } from '../components/models/scan';
import { element } from 'protractor';
import { Search } from '../components/models/searchs';
import { map } from 'rxjs/operators';
// const {Camera} = Plugins;

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  items: any = [];
  todo: any = [];
  textAnotat: any = [];

  textoCompleto: any;
  texto1: string;
  texto2: string;
  texto0: string;

  cervezaApi: any;
  cervezaApi1: any;
  cervezaApi2: any;
  uno: any;
  dos: any;
  tres: any;
  cervezaId: any;
  cervezaApiFinal: any;

  public cervezas: any = [];
  textoBuscar: string;
  // worker: Tesseract.Worker;
  // workerReady = false;
  // image = 'https://tesseract.projectnaptha.com/img/eng_bw.png';
  // orcResult = '';
  // captureProgress = 0;

  recentSearches: any = ['Ticús', 'Modelo Especial', 'Minerva Viena'];

  image: any = [];

  public Uid: string;
  public userInfo: any = [];
  public urlImage: any;
  public arrayUsers: any = [];
  public arrayNombreCervezas: any = [];
  public arrayCerveceriaCervezas: any = [];
  public arrayEstiloCervezas: any = [];
  public arraySearchs: any = [];
  public filtroPrecio = 'precio0';

  constructor(public authService: AuthService,
              public beers: CervezasService,
              private modal: ModalController,
              private alertController: AlertController,
              private vision: GoogleCloudVisionServiceService,
              private camera: Camera,
              private userSvc: UsersService,
              public alert: AlertController) { }

  ngOnInit(): void {
    console.log('Filtro precio', this.filtroPrecio);

    this.beers.getCervezas().subscribe(cervezas => {
      this.cervezas = cervezas;
      this.arraySearchs = cervezas;
      //console.log(this.arraySearchs);

      this.arraySearchs.sort((a, b) => {
        return b.search?.length - a.search?.length;
      });
      console.log(this.arraySearchs);

      for (const i in this.cervezas) {
        this.arrayNombreCervezas.push(this.cervezas[i].nombre.toLowerCase());
              }
      // console.log('Arreglo de nombres de cervezas', this.arrayNombreCervezas);

      for (const i in this.cervezas) {
        this.arrayCerveceriaCervezas.push(this.cervezas[i].cerveceria.toLowerCase());
              }
      // console.log('Arreglo de cervecerias de cervezas', this.arrayCerveceriaCervezas);

      for (const i in this.cervezas) {
        this.arrayEstiloCervezas.push(this.cervezas[i].estilo.toLowerCase());
              }
      // console.log('Arreglo de estilos de cervezas', this.arrayEstiloCervezas);
    });

    this.authService.userData$.subscribe(user => {
      this.Uid = user.uid;
      this.userSvc.getUser(user.uid).subscribe(User => {
        this.userInfo = User;
        // console.log('UserInfo', this.userInfo);
      });
    });

  }

  recentSearch(item){
    // console.log('Busqueda', item);
    if (item){
      this.cervezaApiFinal = item;
    }
  }

  showCerveceriaAlert() {
    this.showAlert('Usuario cervecería', 'Los usuarios cerveceria pueden subir cervezas al sistema desde el menu rapido.');
  }

  saveResults(imageData, results) {
    console.log('IMAGE', imageData);
    console.log('LABELS', results);
    this.items.push({ imageData, results});
    this.todo = results;
    // console.log('TextAnnotations.Text', this.todo[0].textAnnotations);
    // console.log('Todo', this.todo[0].fullTextAnnotation.text);
    this.textoCompleto = this.todo[0].fullTextAnnotation.text.toLowerCase();
    console.log('Minusculas', this.textoCompleto);
    console.log('Uno', this.todo[0].textAnnotations[1].description);
    // this.texto1 = this.todo[0].textAnnotations[1].description;
    // this.texto2 = this.todo[0].textAnnotations[2].description;
    // this.texto0 = this.todo[0].textAnnotations[0].description;

    const palabra0 = this.todo[0].textAnnotations.find(cerveza =>
      this.arrayEstiloCervezas.includes(cerveza.description.toLowerCase()));
    console.log('Barrido con API', palabra0?.description);
    this.uno = palabra0?.description;

    const palabra01 = this.todo[0].textAnnotations.find(cerveza =>
      this.arrayNombreCervezas.includes(cerveza.description.toLowerCase()));
    console.log('Barrido con API1', palabra01?.description);
    this.dos = palabra01?.description;

    const palabra02 = this.todo[0].textAnnotations.find(cerveza =>
      this.arrayCerveceriaCervezas.includes(cerveza.description.toLowerCase()));
    console.log('Barrido con API2', palabra02?.description);
    this.tres = palabra02?.description;

    // this.cervezaApi = palabra0.description;

    if (this.uno) {
      this.cervezaApiFinal = this.uno;
      console.log('PALABRA FINAL: ', this.cervezaApiFinal);
    } else if (this.dos) {
      this.cervezaApiFinal = this.dos;
      console.log('PALABRA FINAL1: ', this.cervezaApiFinal);
    } else if (this.tres) {
      this.cervezaApiFinal = this.tres;
      console.log('PALABRA FINAL2: ', this.cervezaApiFinal);
    } else {
      this.cervezaApiFinal = this.todo[0].textAnnotations[1].description;
      console.log('PALABRA FINAL3: ', this.cervezaApiFinal);
    }

//     //////// NOMBRE DE CERVEZA
//     const palabra = this.todo[0].textAnnotations.find(cerveza =>
//       cerveza.description === 'VIENA' || cerveza.description === 'TICÚS' || cerveza.description === 'COLIMITA' ||
//       cerveza.description === 'CAYACO' || cerveza.description === 'COLONIAL' || cerveza.description === 'Ámbar' ||
//       cerveza.description === 'STOUT' || cerveza.description === 'ORIGINAL' || cerveza.description === 'Negra' ||
//       cerveza.description === 'BORDER' || cerveza.description === '57' || cerveza.description === 'IPA' ||
//       cerveza.description === 'ERDINGER' || cerveza.description === 'Lager' || cerveza.description === 'Chocolate Stout' ||
//       cerveza.description === 'Extra' || cerveza.description === 'Light' || cerveza.description === 'STELLA ARTOIS' ||
//       cerveza.description === 'Especial' || cerveza.description === 'PORTER' || cerveza.description === 'STOUT' || cerveza.description === 'PIEDRA LISA');
//     console.log('Palabra', palabra.description);
//     this.cervezaApi = palabra.description;

// //////// NOMBRE DE CERVECERÍA
//     const palabra1 = this.todo[0].textAnnotations.find(cerveza1 =>
//       cerveza1.description === 'MINERVA' || cerveza1.description === 'Modelo' || cerveza1.description === 'GUINNESS' ||
//       cerveza1.description === 'CUCAPÁ' || cerveza1.description === 'Corona' || cerveza1.description === 'STELLA ARTOIS' ||
//       cerveza1.description === 'ERDINGER' || cerveza1.description === 'Ánima de Sayula' || cerveza1.description === 'PIEDRA LISA' ||
//       cerveza1.description === 'TICÚS' || cerveza1.description === 'COLIMITA' || cerveza1.description === 'CAYACO' ||
//       cerveza1.description === 'PORTER' || cerveza1.description === 'STOUT' || cerveza1.description === 'IPA');
//     console.log('Palabra 1', palabra1?.description);
//     // this.cervezaApi1 = palabra1.description;

//     if (this.cervezaApi === palabra.description){
//         //this.cervezaApiFinal = this.cervezaApi;
//         console.log('PALABRA FINAL: ', this.cervezaApiFinal);

//       } else if (this.cervezaApi1 === palabra1.description) {
//         //this.cervezaApiFinal = this.cervezaApi1;
//         console.log('PALABRA FINAL 1 :', this.cervezaApiFinal);

//       } else {
//         console.log('Uno', this.uno);
//         //this.cervezaApiFinal = this.uno;
//         console.log('PALABRA FINAL 2 :', this.cervezaApiFinal);

//       }
    }



  takePhoto() {
    const options: CameraOptions = {
      quality: 100,
      targetHeight: 500,
      targetWidth: 500,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    };
    this.camera.getPicture(options).then((imageData) => {
      this.image = 'data:image/png;base64,' + imageData;
      console.log('Image', this.image);
      if (this.image){
        this.upload();
      }
      this.vision.getLabels(imageData).subscribe((result: any) => {
        this.saveResults(imageData, result.responses);
      }, err => {
        this.presentAlert('getLabels', err);
      });
    }, err => {
      this.presentAlert('Camera', err);
    });
  }

  selectPhoto() {
    const options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.PNG,
        mediaType: this.camera.MediaType.PICTURE,
        targetWidth: 1000,
        targetHeight: 1000,
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
        // allowEdit: true
    };
    this.camera.getPicture(options).then((imageData) => {
      this.image = 'data:image/png;base64,' + imageData;
      console.log('Image', this.image);
      if (this.image){
        this.upload();
      }
      this.vision.getLabels(imageData).subscribe((result: any) => {
          this.saveResults(imageData, result.responses);
      }, err => {
        this.presentAlert('getLabels', err);
      });
    }, err => {
      this.presentAlert('Camera', err);
    });
  }

  upload() {
    const storageRef = firebase.storage().ref();
    // Create a timestamp as filename
    const filename = Math.floor(Date.now() / 1000);
    // Create a reference to 'images/todays-date.png'
    const imageRef = storageRef.child(`scans/${filename}.png`);
    imageRef.putString(this.image, firebase.storage.StringFormat.DATA_URL)
      .then((snapshot) => {
        imageRef.getDownloadURL().then(urlImage => {
          this.urlImage = urlImage;
          console.log('URL IMAGE', urlImage);
          console.log('cerveza api final', this.cervezaApiFinal);
          if (this.urlImage) {
            this.sendScan();
          }
        });
      });
  }

  async sendScan(){
    const scan: Scan = {
      uid: this.Uid,
      displayName: this.userInfo.displayName,
      resultado: this.cervezaApiFinal,
      img: this.urlImage
    };
    this.userSvc.sendScanToFirebase(scan, this.Uid);
  }

  async presentAlert(subHeader, message) {
    const alert = await this.alertController.create({
      header: 'Error',
      subHeader,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
/**
  async loadWorker(){
    this.worker = createWorker({
      logger: progress => {
        console.log(progress);
        if (progress.status == 'recognizing text'){
          this.captureProgress = parseInt('' + progress.progress * 100)
        }
      }
    });
    await this.worker.load();
    await this.worker.loadLanguage('eng');
    await this.worker.initialize('eng');
    console.log('FIN');
    this.workerReady = true;
  }

  async captureImage(){
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera
    });
    console.log('Image', image);
    this.image = image.dataUrl;
  }

  async recognizeImage(){
    const result  = await this.worker.recognize(this.image);
    console.log('Result', result);
    this.orcResult = result.data.text;
  }
*/
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
    console.log('Se envia la busqueda');
    console.log('Cerveza id', cerveza.id);
    this.cervezaId = cerveza.id;
    const filename = Math.floor(Date.now() / 1000);
    const search = {
      uid: this.Uid + '' + filename
    };
    this.beers.updateSearchToFirebase(search, this.cervezaId);
    console.log('Se envia la buscada a firebase', search);
  }

  onSearchChange(event){
    this.textoBuscar = event.detail.value;
    this.textoBuscar = this.textoBuscar.toLowerCase();
    console.log('Lo que obtengo', this.textoBuscar);
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
