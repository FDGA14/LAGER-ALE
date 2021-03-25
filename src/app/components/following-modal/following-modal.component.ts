import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-following-modal',
  templateUrl: './following-modal.component.html',
  styleUrls: ['./following-modal.component.scss'],
})
export class FollowingModalComponent implements OnInit {

  public following: string;
  public array: any;

  constructor(private modal: ModalController,
              private navParams: NavParams) { }

  ngOnInit() {
    this.following = this.navParams.get('following');
    console.log(this.following);   
  }

  closeChat(){
    this.modal.dismiss();
  }

}
