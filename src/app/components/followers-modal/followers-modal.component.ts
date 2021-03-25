import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-followers-modal',
  templateUrl: './followers-modal.component.html',
  styleUrls: ['./followers-modal.component.scss'],
})
export class FollowersModalComponent implements OnInit {

  public followers: string;
  public array: any;

  constructor(private modal: ModalController,
              private navParams: NavParams) { }

  ngOnInit() {
    this.followers = this.navParams.get('followers');
    console.log(this.followers);   
  }

  closeChat(){
    this.modal.dismiss();
  }

}
