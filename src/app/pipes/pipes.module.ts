import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltroPipe } from './filtro.pipe';
import { Filtro1Pipe } from './filtro1.pipe';

@NgModule({
  declarations: [FiltroPipe, Filtro1Pipe],
  imports: [
    CommonModule
  ],
  exports: [FiltroPipe, Filtro1Pipe]
})
export class PipesModule { }
