import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { ModalController, NavParams, AlertController } from '@ionic/angular';
import { Stores } from '../models/stores';
import { UsersService } from '../../services/users.service';
import { AuthService } from 'src/app/services/auth.service';
import { CervezasService } from '../../services/cervezas.service';
declare var google;

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.scss'],
})
export class StoresComponent implements OnInit {

  public cerveza: any;
  public nombre: string;
  public id: string;
  public img;
  public store: string;
  public ubi: string;
  public uid: string;
  public cervezaInfo: any;
  geocoder: any;
  markers: any;
  storeLat: any;
  storeLng: any;
  position: any;
  arrayStores: any = [];
  positionFinal: any;


  @ViewChild('map',  {static: false}) mapElement: ElementRef;
  map: any;
  address: string;
  lat: string;
  long: string;
  autocomplete: { input: string; };
  autocompleteItems: any[];
  location: any;
  placeid: any;
  GoogleAutocomplete: any;

  constructor(private modal: ModalController,
              private navParams: NavParams,
              private geolocation: Geolocation,
              private nativeGeocoder: NativeGeocoder,
              public zone: NgZone,
              public userSvc: UsersService,
              private authService: AuthService,
              public cervezasSvc: CervezasService,
              public alert: AlertController
    ) {
      this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
      this.autocomplete = { input: '' };
      this.autocompleteItems = [];
    }

  ngOnInit() {



    this.loadMap();

    this.nombre = this.navParams.get('nombre');
    this.img = this.navParams.get('img');
    this.cerveza = this.navParams.get('cerveza');
    this.id = this.navParams.get('id');


    this.authService.userData$.subscribe(user => {
      this.uid = user.uid;
      console.log('User UID', this.uid);
    });


    this.cervezasSvc.getChatRoom(this.id).subscribe(cerveza => {
        this.cervezaInfo = cerveza;
        console.log('Cerveza info', this.cervezaInfo);
        console.log('Cerveza Stores', this.cervezaInfo.stores);
        for (const i in this.cervezaInfo.stores) {
          this.arrayStores.push(this.cervezaInfo.stores[i].store);
                }
        console.log('Arreglo de nombres de tiendas', this.arrayStores);
      });
  }

  loadMap() {

    // OBTENEMOS LAS COORDENADAS DESDE EL TELEFONO.
    this.geolocation.getCurrentPosition().then((resp) => {
      const latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
      const mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      // CUANDO TENEMOS LAS COORDENADAS SIMPLEMENTE NECESITAMOS PASAR AL MAPA DE GOOGLE TODOS LOS PARAMETROS.
      this.getAddressFromCoords(resp.coords.latitude, resp.coords.longitude);
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      this.map.addListener('tilesloaded', () => {
        console.log('accuracy', this.map, this.map.center.lat());
        this.getAddressFromCoords(this.map.center.lat(), this.map.center.lng());
        this.lat = this.map.center.lat();
        this.long = this.map.center.lng();
      });
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }


  getAddressFromCoords(lattitude, longitude) {
    if (this.position) {
    console.log('getAddressFromCoords ' + lattitude + ' ' + longitude);
    const positionF = {
      lat: lattitude,
      lng: longitude
    };
    this.positionFinal = positionF;
    console.log('FINAL', this.positionFinal);
    const options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    };
    this.nativeGeocoder.reverseGeocode(lattitude, longitude, options)
      .then((result: NativeGeocoderResult[]) => {
        this.address = '';
        const responseAddress = [];
        for (const [key, value] of Object.entries(result[0])) {
          if (value.length > 0) {
          responseAddress.push(value);
          }
        }
        responseAddress.reverse();
        for (const value of responseAddress) {
          this.address += value + ', ';
        }
        this.address = this.address.slice(0, -2);
      })
      .catch((error: any) => {
        this.address = 'Address Not Available!';
      });
    }
  }

  // FUNCION DEL BOTON INFERIOR PARA QUE NOS DIGA LAS COORDENADAS DEL LUGAR EN EL QUE POSICIONAMOS EL PIN.
  ShowCords(){
    alert('lat' + this.lat + ', long' + this.long );
  }

  // AUTOCOMPLETE, SIMPLEMENTE ACTUALIZAMOS LA LISTA CON CADA EVENTO DE ION CHANGE EN LA VISTA.
  UpdateSearchResults(){
    if (this.autocomplete.input === '') {
      this.autocompleteItems = [];
      return;
    }
    this.GoogleAutocomplete.getPlacePredictions({ input: this.autocomplete.input },
    (predictions, status) => {
      this.autocompleteItems = [];
      this.zone.run(() => {
        predictions.forEach((prediction) => {
          this.autocompleteItems.push(prediction);
        });
      });
    });
  }

  // FUNCION QUE LLAMAMOS DESDE EL ITEM DE LA LISTA.
  SelectSearchResult(item) {
    console.log('Toda la info', item);
    this.store = item.structured_formatting.main_text;
    this.ubi = item.structured_formatting.secondary_text;
    console.log('Tienda', this.store);
    console.log('Ubicacion', this.ubi);
    if (this.positionFinal){
      this.sendStoreToFirebase();
    }
    this.geocoder = new google.maps.Geocoder;
    this.markers = [];


    this.geocoder.geocode({placeId: item.place_id}, (results, status) => {
      if (status === 'OK' && results[0]){
        const position = {
            lat: results[0].geometry.location.lat,
            lng: results[0].geometry.location.lng
        };

        const marker = new google.maps.Marker({
          position: results[0].geometry.location,
          map: this.map,
        });
        this.getAddressFromCoordsStore(this.map.center.lat(), this.map.center.lng());
        this.markers.push(marker);
        this.map.setCenter(results[0].geometry.location);
      }
    });
    // AQUI PONDREMOS LO QUE QUERAMOS QUE PASE CON EL PLACE ESCOGIDO, GUARDARLO, SUBIRLO A FIRESTORE.
    // HE AÑADIDO UN ALERT PARA VER EL CONTENIDO QUE NOS OFRECE GOOGLE Y GUARDAMOS EL PLACEID PARA UTILIZARLO POSTERIORMENTE SI QUEREMOS.
    this.placeid = item.place_id;
    console.log('PLACEID', this.placeid);
  }

  getAddressFromCoordsStore(lattitude, longitude) {
    console.log('getAddressFromCoordsStore ' + lattitude + ' ' + longitude);
    this.storeLat = lattitude;
    console.log('Latitud ', lattitude);
    this.storeLng = longitude;
    console.log('Longitud ', longitude);
    this.position = {
      lat: lattitude,
      lng: longitude
    };
    console.log ('Posicion store:', this.position);
    const options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    };
  }


  // LLAMAMOS A ESTA FUNCION PARA LIMPIAR LA LISTA CUANDO PULSAMOS IONCLEAR.
  ClearAutocomplete(){
    this.autocompleteItems = [];
    this.autocomplete.input = '';
  }

  // EJEMPLO PARA IR A UN LUGAR DESDE UN LINK EXTERNO, ABRIR GOOGLE MAPS PARA DIRECCIONES.
  GoTo(){
    return window.location.href = 'https://www.google.com/maps/search/?api=1&query=Google&query_place_id=' + this.placeid;
  }

  sendStoreToFirebase(){
    console.log('ENTRO A LA FUNCION');
    const store: Stores = {
      store: this.store,
      location: this.ubi,
      uid: this.uid,
      position: this.positionFinal
    };
    console.log('Se actualiza la tabla del usuario cervceria con store', store);
    console.log('ID cerveza', this.id);

    if (this.arrayStores.includes(store.store)){
      console.log('Ya existe');
      this.showAlert('La tienda ya esta agregada.', 'Intente con otra.');
    } else {
      console.log('Se agrega a firebase');
      this.cervezasSvc.sendStoresToFirebase(store, this.id);
      this.showAlert('Tienda agregada.', 'La tienda se ha agregado correctamente.');
    }
  }

  deleteStore(stores: Stores){
    const store: Stores = {
      store: stores.store,
      location: stores.location,
      uid: stores.uid,
      position: stores.position
    };
    console.log('Eliminar store', store);
    console.log('ID cerveza', this.id);
    this.cervezasSvc.deleteStoresToFirebase(store, this.id);
  }

  async showAlert(header: string, message: string){
    const alert = this.alert.create({
      header,
      message,
      buttons: ['Ok']
    });
    await  (await alert).present();
  }

  closeChat(){
    this.modal.dismiss();
  }

}
