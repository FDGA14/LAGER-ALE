import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { cerveza, CervezasService } from '../../../services/cervezas.service';


@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
})
export class EditProductComponent implements OnInit {

  private image: any;
  private imageOriginal: any;

  @Input() cerveza: cerveza;

  constructor(private cervezaSVC: CervezasService) { }

  public editPostForm = new FormGroup({
    nombre: new FormControl ('', Validators.required),
    img: new FormControl ('', Validators.required),
    descripcion: new FormControl ('', Validators.required),
    cerveceria: new FormControl ('', Validators.required),
    precio: new FormControl ('', Validators.required),
    volumen: new FormControl ('', Validators.required),
    estilo: new FormControl ('', Validators.required),
    id: new FormControl ('', Validators.required),
    uid: new FormControl ('', Validators.required),
    pais: new FormControl ('', Validators.required),
    porcentaje: new FormControl ('', Validators.required),
    tipo: new FormControl ('', Validators.required),
    elaboracion: new FormControl ('', Validators.required),
    fermentacion: new FormControl ('', Validators.required),
    granos: new FormControl ('', Validators.required)
  });

  ngOnInit() {
    this.image = this.cerveza.img;
    this.imageOriginal = this.cerveza.img;
    this.initValuesForm();
  }

  editPost(cerveza: cerveza){
    console.log('Img', this.imageOriginal);
    console.log('Origial', this.image);
    console.log(cerveza);
    if (this.image  === this.imageOriginal){
      this.imageOriginal = cerveza.img;
      this.cervezaSVC.editCerveza(cerveza);
    } else {
      this.cervezaSVC.editCerveza(cerveza, this.image);
      console.log(cerveza);
    }
  }

  handleImage(event: any): void{
    this.image = event.target.files[0];
  }

  private initValuesForm(): void{
    this.editPostForm.patchValue({
      nombre: this.cerveza.nombre,
      descripcion: this.cerveza.descripcion,
      cerveceria: this.cerveza.cerveceria,
      volumen: this.cerveza.volumen,
      precio: this.cerveza.precio,
      estilo: this.cerveza.estilo,
      id: this.cerveza.id,
      uid: this.cerveza.uid,
      porcentaje: this.cerveza.porcentaje,
      pais: this.cerveza.pais,
      tipo: this.cerveza.tipo,
      img: this.cerveza.img,
      elaboracion: this.cerveza.elaboracion,
      fermentacion: this.cerveza.fermentacion,
      granos: this.cerveza.granos
    });
  }

}
