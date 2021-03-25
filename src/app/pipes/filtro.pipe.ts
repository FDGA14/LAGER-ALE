import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform(arreglo: any[], nombre: string = ''): any [] {

    if (nombre === ''){
      return arreglo;
    }
    if (!arreglo){
      return arreglo;
    }

    nombre = nombre.toLowerCase();
    // console.log('Nombre', nombre);

    return arreglo.filter(item =>
      item.estilo.toLowerCase().includes(nombre) ||
      item.nombre.toLowerCase().includes(nombre)
    );
  }

}
