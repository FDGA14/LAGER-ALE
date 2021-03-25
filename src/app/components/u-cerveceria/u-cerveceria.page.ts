import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-u-cerveceria',
  templateUrl: './u-cerveceria.page.html',
  styleUrls: ['./u-cerveceria.page.scss'],
})
export class UCerveceriaPage implements OnInit {

  public cerveceria: any = [];

  constructor(private authService: AuthService) { }

  ngOnInit() { 
    this.authService.userData$.subscribe(user =>{
      // tslint:disable-next-line: no-unused-expression
      this.cerveceria = user.uid;
      console.log('User=>', user.uid);
    });
  }

}
