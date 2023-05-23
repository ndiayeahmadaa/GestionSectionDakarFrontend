import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DahiraComponent } from './dahira.component';

const routes: Routes = [
  {
    path: '',
    component: DahiraComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DahiraRoutingModule {
}
