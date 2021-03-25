import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtro1'
})
export class Filtro1Pipe implements PipeTransform {

    transform(arreglo: any[], displayName: string = ''): any [] {

      if (displayName === ''){
        return arreglo;
      }
      if (!arreglo){
        return arreglo;
      }

      displayName = displayName.toLowerCase();
      console.log('Nombre', displayName);

      return arreglo.filter(
        item => item.displayName.toLowerCase().includes(displayName)
      );
    }


}
