import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullNamePipe } from './full-name.pipe';
import { ResaltadoDirective } from './resaltado.directive';



@NgModule({
  declarations: [
    FullNamePipe,
    ResaltadoDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FullNamePipe
  ]
})
export class SharedModule { }
