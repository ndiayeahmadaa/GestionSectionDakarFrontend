import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddUpdateFonctionComponent } from './add-update-fonction/add-update-fonction.component';
import { ListeFonctionComponent } from './liste-fonction/liste-fonction.component';



@NgModule({
  declarations: [AddUpdateFonctionComponent, ListeFonctionComponent],
  imports: [
    CommonModule
  ]
})
export class FonctionModule { }
