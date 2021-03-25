import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Publicacion } from '../../models/publicacion';
import { PublicacionesService } from '../../../services/publicaciones.service';

@Component({
  selector: 'app-edit-publicacion',
  templateUrl: './edit-publicacion.component.html',
  styleUrls: ['./edit-publicacion.component.scss'],
})
export class EditPublicacionComponent implements OnInit {

  private image: any;
  private imageOriginal: any;

  @Input() publicacion: Publicacion;

  constructor(private publicacionSvc: PublicacionesService) { }

  public editPostForm = new FormGroup({
    descripcion: new FormControl('', Validators.required),
    imagePublicacion: new FormControl('', Validators.required),
    user: new FormControl('', Validators.required),
    id: new FormControl('', Validators.required)
  })

  ngOnInit() {
    this.image = this.publicacion.imagePublicacion;
    this.imageOriginal = this.publicacion.imagePublicacion;
    this.initValuesForm();
  }

  editPublicacion(publicacion: Publicacion){
    console.log('img', this.image);
    console.log('Original', this.imageOriginal);
    if(this.image === this.imageOriginal){
      publicacion.imagePublicacion = this.imageOriginal;
      this.publicacionSvc.editPublicacion(publicacion);
    } else {
      this.publicacionSvc.editPublicacion(publicacion, this.image);
    }
  }

  handleImage(event: any): void{
    this.image = event.target.file[0];
  }

  private initValuesForm(): void{
    this.editPostForm.patchValue({
      id: this.publicacion.id,
      user: this.publicacion.user,
      descripcion: this.publicacion.descripcion
    })
  }

}
