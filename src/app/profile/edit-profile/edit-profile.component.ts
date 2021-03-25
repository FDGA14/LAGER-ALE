import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { comentario } from 'src/app/components/models/comentario';
import { AuthService } from 'src/app/services/auth.service';
import { UserInterface } from '../../components/models/user';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {

  private image: any;
  private imageOriginal: any;
    //public currentImage = "https://picsum.photos/200";
  public Uid: string;
  public userInfo: any = [];

  @Input() user: UserInterface;

  constructor(private userSvc: UsersService, public authService: AuthService) { }

  public editUserForm = new FormGroup({
    id: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    displayName: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required),
    peso: new FormControl('', Validators.required),
    photoURL: new FormControl('', Validators.required)
  });

  ngOnInit() {
    this.image = this.user.photoURL;
    this.imageOriginal = this.user.photoURL;
    this.initValuesForm();

    this.authService.userData$.subscribe(user => {
      this.Uid = user.uid;
      this.userSvc.getUser(user.uid).subscribe(User => {
        this.userInfo = User;
        console.log('UserInfo', this.userInfo);
      });
    });
  }

  editUser(user: UserInterface){
    console.log('IMG', this.image);
    console.log('Original', this.imageOriginal);
    if (this.image === this.imageOriginal){
      user.photoURL = this.imageOriginal;
      this.userSvc.editUser(user);
    } else {
      this.userSvc.editUser(user, this.image);
    }
  }

  handleImage(event: any): void{
    this.image =  event.target.files[0];
  }

  private initValuesForm(): void{
    this.editUserForm.patchValue({
      id: this.user.id,
      displayName: this.user.displayName,
      descripcion: this.user.descripcion,
      peso: this.user.peso,
      password: this.user.password,
      email: this.user.email,
    });
  }

}
