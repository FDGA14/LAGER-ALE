import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarComponent } from 'ionic2-calendar';
import { AlertController, ModalController } from '@ionic/angular/';
import { CalModalPage } from '../cal-modal/cal-modal.page';
import { UsersService } from 'src/app/services/users.service';
import { AuthService } from 'src/app/services/auth.service';
import { userInfo } from 'os';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {

  users: any;

  eventSource = [];
  event1 = {
    title: 'Cerveza México. World Trade Center, CDMX',
    desc: 'Descripcion',
    startTime: new Date(Date.UTC(2021, 3, 16)),
    endTime: new Date(Date.UTC(2021, 3, 19)),
    allDay: true
  };
  event2 = {
    title: 'Oktoberfest, Múnich, Alemania',
    desc: 'Descripcion',
    startTime: new Date(Date.UTC(2021, 8, 18)),
    endTime: new Date(Date.UTC(2021, 9, 4)),
    allDay: true
  };
  event3 = {
    title: 'Great British Beer Festival, Londres',
    desc: 'Descripcion',
    startTime: new Date(Date.UTC(2021, 7, 3)),
    endTime: new Date(Date.UTC(2021, 7, 8)),
    allDay: true
  };
  event4 = {
    title: 'Belgian Beer Weekend, Brucelas',
    desc: 'Descripcion',
    startTime: new Date(Date.UTC(2021, 8, 3)),
    endTime: new Date(Date.UTC(2021, 8, 6)),
    allDay: true
  };
  event5 = {
    title: 'Great American Beer Fest, Colorado',
    desc: 'Descripcion',
    startTime: new Date(Date.UTC(2021, 9, 7)),
    endTime: new Date(Date.UTC(2021, 9, 10)),
    allDay: true
  };
  event6 = {
    title: 'Cervefest, CDMX',
    desc: 'Descripcion',
    startTime: new Date(Date.UTC(2021, 2, 13)),
    endTime: new Date(Date.UTC(2021, 2, 16)),
    allDay: true
  };
  event7 = {
    title: 'Ensenada Beer Fest, Ensenada',
    desc: 'Descripcion',
    startTime: new Date(Date.UTC(2021, 2, 19)),
    endTime: new Date(Date.UTC(2021, 2, 21)),
    allDay: true
  };

  viewTitle: string;

  calendar = {
    mode: 'month',
    currentDate: new Date(),
  };

  selectedDate: Date;

  uid: any;
  userInfo: any;
  arrayEvents: any = [];

  @ViewChild(CalendarComponent) myCal: CalendarComponent;

  constructor(
    private modalCtrl: ModalController,
    private userSvc: UsersService,
    private authService: AuthService,
    public alert: AlertController
  ) { }

  ngOnInit() {

    this.userSvc.getUsuarios().subscribe(usuarios => {
      console.log(usuarios);
      this.users = usuarios;
      // this.usuarios = usuarios;
    });

    this.authService.userData$.subscribe(user => {
      this.uid = user.uid;
      console.log(this.uid);
      this.userSvc.getUser(user.uid).subscribe(User => {
        this.userInfo = User;
        console.log('UserInfo', this.userInfo);
      });
    });

    this.eventSource.push(this.event1);
    this.eventSource.push(this.event2);
    this.eventSource.push(this.event3);
    this.eventSource.push(this.event4);
    this.eventSource.push(this.event5);
    this.eventSource.push(this.event6);
    this.eventSource.push(this.event7);
    console.log(this.eventSource);


  }

  evento(evento){
    console.log(evento);
  }

  // Change current month/week/day
  next() {
    this.myCal.slideNext();
  }

  back() {
    this.myCal.slidePrev();
  }

  // Selected date reange and hence title changed
  onViewTitleChanged(title) {
    this.viewTitle = title;
    if (this.viewTitle) {
      console.log('Funciona', this.viewTitle);
    }
  }

  async openCalModal() {
    const modal = await this.modalCtrl.create({
      component: CalModalPage,
      cssClass: 'cal-modal',
      backdropDismiss: false
    });

    await modal.present();

    modal.onDidDismiss().then((result) => {
      if (result.data && result.data.event) {
        const event = result.data.event;
        if (event.allDay) {
          const start = event.startTime;
          event.startTime = new Date(
            Date.UTC(
              start.getUTCFullYear(),
              start.getUTCMonth(),
              start.getUTCDate()
            )
          );
          event.endTime = new Date(
            Date.UTC(
              start.getUTCFullYear(),
              start.getUTCMonth(),
              start.getUTCDate() + 1
            )
          );
        }
        this.eventSource.push(result.data.event);
        console.log(result.data.event);
        this.myCal.loadEvents();
        const evento = {
          uid: this.uid,
          title: result.data.event.title,
          desc: result.data.event.desc,
          startTime: result.data.event.startTime,
          endTime: result.data.event.endTime,
          allDay: true
        };
        console.log(evento);
        // this.userSvc.sendEventToFirebase(evento, this.uid);
        this.alert.create({
          header: 'Evento subido al calendario',
          subHeader: 'Comprobar en el calendario',
          inputs: [
            {
              value: evento.title,
              disabled: true
            },
            {
              value: evento.desc,
              disabled: true
            },
            {
              value: evento.startTime,
              disabled: true
            },
            {
              value: evento.endTime,
              disabled: true
            },
          ],
          buttons: [
            {
              text: 'Aceptar',
              handler: data => {
                console.log('Data', data);
              }
            }
          ]
        }).then((confirmElement) => {
          confirmElement.present();
        });
      }
    });
  }

}
