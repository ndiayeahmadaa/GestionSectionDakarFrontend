import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DahiraComponent } from './dahira.component';
import { DahiraRoutingModule } from './dahira-routing.module'



@NgModule({
  declarations: [DahiraComponent],
  imports: [
    DahiraRoutingModule,
    CommonModule
  ]
})
export class DahiraModule { }
